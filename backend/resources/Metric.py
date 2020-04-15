import joblib
import traceback
from utils import utils
from flask import request, current_app
from flask_restful import Resource


class Metric(Resource):

    def get_metrics(tpot):
        precision = SCORERS['precision'](tpot, X_test, Y_test)
        recall = SCORERS['recall'](tpot, X_test, Y_test)
        roc_auc = SCORERS['roc_auc'](tpot, X_test, Y_test)

    def load_model(self):
        filename = utils.get_filename_from_path(request, '')
        path = f"{current_app.config.get('TRAIN_MODELS')}/{filename}.sav"
        loaded_model = joblib.load(open(path, 'rb'))

        return loaded_model

    def post(self):
        try:
            tpot = self.load_model()

            
            
            return {}

        except:
            traceback.print_exc()
            return {"msg": "Error on POST Metric"}, 500