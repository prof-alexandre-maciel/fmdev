import joblib
import traceback
import numpy as np
import pandas as pd
from utils import utils
from flask import request
from tpot import TPOTClassifier
from flask_restful import Resource
from dask.distributed import Client
from sklearn.datasets import load_iris
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

    def get_dataframe_from_csv(self):
        payload = request.get_json()

        path = payload['path']
        df = pd.read_csv(path)

        return df

    def get_split(df, target):
        msk = np.random.rand(len(df)) < 0.7

        train = df[msk]
        test = df[~msk]

        x_test = test[target]
        x_test = test.drop(labels=[target], axis=1)

        y_train = train[target]
        x_train = train.drop(labels=[target], axis=1)

        return x_train, y_train, x_test, x_test

    def post(self):
        try:
            # iris = load_iris()
            # payload = request.get_json()
            # mandatory_fields = ['train', 'test', 'time', 'path', 'target']

            # for field in mandatory_fields:
            #     if field not in payload:
            #         return {'msg': f'{field} not found'}, 500

            # train = payload['train'] / 100
            # test = payload['test'] / 100
            # target = payload['target']
            # time = payload['time']

            # df = self.get_dataframe_from_csv()
            # df_categoric = df.copy()
            # df_categoric = df_categoric.select_dtypes(include=['object'])
            # df = df.drop(df_categoric.columns, axis=1)
            # df_x = df.copy()
            # del df_x[target]

            # x_train, x_test, y_train, y_test = train_test_split(
            #     df_x, df[target], train_size=train, test_size=test)

            # # connect to the cluster
            # client = Client(processes=False)

            # tpot = TPOTClassifier(generations=5,
            #                         max_time_mins=time,
            #                         population_size=20, cv=5,
            #                         random_state=42, verbosity=3,
            #                         use_dask=True)

            # with joblib.parallel_backend("dask"):
            #     tpot.fit(x_train, y_train)

            # return {
            #     "score": tpot.score(x_test, y_test),
            #     "qtd_evaluated_pipelines": len(tpot.evaluated_individuals_),
            #     "fitted_pipelines": self.get_used_pipeline(tpot)
            # }

            import time
            time.sleep(10)

            return {
                "score": 0.6782608695652174,
                "qtd_evaluated_pipelines": 118,
                "fitted_pipelines": [
                    {
                        "algorithm": "LinearSVC",
                        "hyperparameters": [
                            "input_matrix",
                            "C=10.0",
                            "dual=False",
                            "loss=squared_hinge",
                            "penalty=l1",
                            "tol=0.0001)"
                        ]
                    }
                ]
            }

        except:
            traceback.print_exc()
            return {"msg": "Error on POST Modeling"}, 500
