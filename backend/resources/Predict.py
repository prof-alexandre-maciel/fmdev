import json
import joblib
import traceback
import pandas as pd
from numpy import array
from utils import utils
from flask_restful import Resource
from flask import request, current_app
from flask_jwt_extended import jwt_required


class Predict(Resource):

    def load_model(self, filename):
        path = f"{current_app.config.get('TRAIN_MODELS')}/{filename}.sav"
        loaded_model = joblib.load(open(path, 'rb'))

        return loaded_model

    @jwt_required
    def post(self, key):
        try:
            payload = request.get_json()
            x_test = pd.DataFrame(payload['data']) 
            model = self.load_model(filename=key)
            predict = model.predict(x_test)

            data_predicted = predict.tolist()

            return { 'data': data_predicted }
        except:
            traceback.print_exc()
            return {"msg": "Error on GET Copy"}, 500
