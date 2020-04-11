import os
import joblib
import traceback
import numpy as np
import pandas as pd
from utils import utils
from tpot import TPOTClassifier
from flask_restful import Resource
from dask.distributed import Client
from flask import request, current_app
from sklearn.metrics import make_scorer, SCORERS
from sklearn.model_selection import train_test_split


class Train(Resource):

    def get_used_pipeline(self, tpot):
        pipelines = []

        for item in tpot.pareto_front_fitted_pipelines_:
            algorithm = item.split('(', 1)[0]
            params = item.split('(', 1)[1]
            params = params.replace(f"{algorithm}__", '')
            params_splitted = params.split(', ')
            pipelines.append({
                'algorithm': algorithm,
                'hyperparameters': params_splitted
            })

        return pipelines
    
    def train(self, x_train, y_train, time):
        client = Client(processes=False)

        tpot = TPOTClassifier(generations=5,
                            max_time_mins=time,
                            population_size=20, cv=5,
                            random_state=42, verbosity=3,
                            use_dask=True)

        with joblib.parallel_backend("dask"):
            tpot.fit(x_train, y_train)
        
        return tpot

    def get_dataframe_from_csv(self):
        payload = request.get_json()

        path = payload['path']
        df = pd.read_csv(path)

        return df
    
    def get_df_without_one_hot_encoding(self, target):
        df = self.get_dataframe_from_csv()
        df_categoric = df.copy()
        df_categoric = df_categoric.select_dtypes(include=['object'])
        df = df.drop(df_categoric.columns, axis=1)
        df_x = df.copy()

        del df_x[target]

        return df, df_x
    
    def save(self, tpot):
        payload = request.get_json()
        path = payload['path']
        filename = os.path.basename(path).replace('.csv', '.sav')
        filename = f"{current_app.config.get('TRAIN_MODELS')}/{filename}"
        joblib.dump(tpot.fitted_pipeline_, open(filename, 'wb'))

    def export(self, tpot):
        payload = request.get_json()
        path = payload['path']
        filename = os.path.basename(path).replace('.csv', '.py')

        filename = f"{current_app.config.get('TRAIN_PIPELINES')}/{filename}"
        tpot.export(filename)
    
    def post(self):
        try:
            payload = request.get_json()
            mandatory_fields = ['train', 'test', 'time', 'path', 'target']

            for field in mandatory_fields:
                if field not in payload:
                    return {'msg': f'{field} not found'}, 500

            train = payload['train'] / 100
            test = payload['test'] / 100
            target = payload['target']
            time = payload['time']

            df, df_x = self.get_df_without_one_hot_encoding(target)

            x_train, x_test, y_train, y_test = train_test_split(
                df_x, df[target], train_size=train, test_size=test)

            tpot = self.train(x_train, y_train, time)

            self.save(tpot)
            self.export(tpot)

            return {
                "score": tpot.score(x_test, y_test),
                "qtd_evaluated_pipelines": len(tpot.evaluated_individuals_),
                "fitted_pipelines": self.get_used_pipeline(tpot)
            }

            # import time
            # time.sleep(10)

            # return {
            #     "score": 0.6782608695652174,
            #     "qtd_evaluated_pipelines": 118,
            #     "fitted_pipelines": [
            #         {
            #             "algorithm": "LinearSVC",
            #             "hyperparameters": [
            #                 "input_matrix",
            #                 "C=10.0",
            #                 "dual=False",
            #                 "loss=squared_hinge",
            #                 "penalty=l1",
            #                 "tol=0.0001)"
            #             ]
            #         }
            #     ]
            # }

        except:
            traceback.print_exc()
            return {"msg": "Error on POST Modeling"}, 500
