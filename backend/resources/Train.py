import traceback
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

    def post(self):
        try:
            iris = load_iris()

            X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target,
                                                                train_size=0.75, test_size=0.25)

            tpot = TPOTClassifier(verbosity=2, max_time_mins=1)
            tpot.fit(X_train, y_train)

            return {
                "score": tpot.score(X_test, y_test),
                "qtd_evaluated_pipelines": len(tpot.evaluated_individuals_),
                "fitted_pipelines": self.get_used_pipeline(tpot)
            }

        except:
            traceback.print_exc()
            return {"msg": "Error on POST Modeling"}, 500
