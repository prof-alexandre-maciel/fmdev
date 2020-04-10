import traceback
import pandas as pd
from utils import utils
from flask import request
from flask_restful import Resource

import numpy as np
from tpot import TPOTClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import make_scorer, SCORERS


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

    def post(self):
        try:
            iris = load_iris()
            payload = request.get_json()
            mandatory_fields = ['train', 'test', 'time', 'path', 'target']

            for field in mandatory_fields:
                if field not in payload:
                    return {'msg': f'{field} not found'}, 500

            train = payload['train'] / 100
            test = payload['test'] / 100
            target = payload['target']
            time = payload['time']

            df = self.get_dataframe_from_csv()
            df_x = df.copy()
            del df_x[target]
            

            X_train, X_test, y_train, y_test = train_test_split(
                df_x, df[target], train_size=train, test_size=test)

            tpot = TPOTClassifier(verbosity=2, max_time_mins=time)
            tpot.fit(X_train, y_train)

            return {
                "score": tpot.score(X_test, y_test),
                "qtd_evaluated_pipelines": len(tpot.evaluated_individuals_),
                "fitted_pipelines": self.get_used_pipeline(tpot)
            }

        except:
            traceback.print_exc()
            return {"msg": "Error on POST Modeling"}, 500
