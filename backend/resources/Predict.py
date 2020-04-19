import json
import joblib
import traceback
import pandas as pd
from numpy import array
from utils import utils
from flask_restful import Resource
from flask import request, current_app
from resources.TrainModel import TrainModelResource


class Predict(Resource):

    def is_api_key_valid(self, key):
        train_model = TrainModelResource.get_by_id(key)

        if 'Fmdev-Api-Key' not in request.headers:
            return False

        if request.headers['Fmdev-Api-Key'] == train_model.api_key:
            return True

        return False


    def load_model(self, filename):
        path = f"{current_app.config.get('TRAIN_MODELS')}/{filename}.sav"
        loaded_model = joblib.load(open(path, 'rb'))

        return loaded_model

    def post(self, key):
        try:
            is_api_key_valid = self.is_api_key_valid(key)

            if is_api_key_valid == False:
                return {'msg': 'Fmdev-Api-Key is not valid'}, 401

            payload = request.get_json()
            x_test = pd.DataFrame(payload['data']) 
            model = self.load_model(filename=key)
            predict = model.predict(x_test)

            data_predicted = predict.tolist()
            TrainModelResource.update_predict(key)

            return { 'data': data_predicted }
        except:
            traceback.print_exc()
            return {"msg": "Error on GET Copy"}, 500
