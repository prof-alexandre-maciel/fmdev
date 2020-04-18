import json
import joblib
import traceback
import pandas as pd
from utils import utils
from flask_restful import Resource
from flask import request, current_app
from flask_jwt_extended import jwt_required


class Predict(Resource):

    def get_df_test_data(self, filename, split_type):
        filename = f"{current_app.config.get(split_type)}/{filename}.csv"
        df = pd.read_csv(filename)

        return df

    @jwt_required
    def post(self, key):
        try:
            payload = request.get_json()
            df = self.get_df_test_data(key, 'TEST_FEATURES')

            print(df, payload)

            return {}
        except:
            traceback.print_exc()
            return {"msg": "Error on GET Copy"}, 500
