import joblib
import traceback
import pandas as pd
from utils import utils
from flask_restful import Resource
from sklearn.metrics import SCORERS
from flask import request, current_app


class Metric(Resource):
    
    def get_test_data(self, split_type):
        filename = utils.get_filename_from_path(request, '.csv')
        filename = f"{current_app.config.get(split_type)}/{filename}"
        data = pd.read_csv(filename)

        return data

    def get_metrics(self, tpot, x_test, y_test):
        metrics = {
            'score': tpot.score(x_test, y_test),
            'precision': SCORERS['precision'](tpot, x_test, y_test),
            'recall': SCORERS['recall'](tpot, x_test, y_test),
            'roc_auc': SCORERS['roc_auc'](tpot, x_test, y_test)
        }

        return metrics

    def load_model(self):
        filename = utils.get_filename_from_path(request, '')
        path = f"{current_app.config.get('TRAIN_MODELS')}/{filename}.sav"
        loaded_model = joblib.load(open(path, 'rb'))

        return loaded_model

    def post(self):
        try:
            tpot = self.load_model()
            x_test = self.get_test_data('TEST_FEATURES')
            y_test = self.get_test_data('TEST_TARGET')
            metrics = self.get_metrics(tpot, x_test, y_test)

            return metrics

        except:
            traceback.print_exc()
            return {"msg": "Error on POST Metric"}, 500