import json
import joblib
import traceback
import pandas as pd
from utils import utils
from flask_restful import Resource
from flask import request, current_app
from flask_jwt_extended import jwt_required
from resources.TrainModel import TrainModelResource


class ModelCopy(Resource):

    def get_curl_template(self, key, data):
        model = TrainModelResource.get_by_id(key)

        template = f"""curl --location --request POST '{current_app.config.get('BASE_URL')}/api/predict/{key}' \
                        --header 'Fmdev-Api-Key: {model.api_key}' \
                        --header 'Accept: application/json, text/plain, */*' \
                        --header 'Content-Type: application/json;charset=UTF-8' \
                        --header 'Content-Type: text/plain' \
                        --data-raw '{json.dumps(data)}'"""
        return template

    def get_df_test_data(self, filename, split_type):
        filename = f"{current_app.config.get(split_type)}/{filename}.csv"
        df = pd.read_csv(filename)

        return df

    @jwt_required
    def get(self, key):
        try:
            df = self.get_df_test_data(key, 'TEST_FEATURES')

            data = {
                'data': [df.iloc[0].to_dict()]
            }

            template = self.get_curl_template(key, data)

            return { 'template': template }

        except:
            traceback.print_exc()
            return {"msg": "Error on GET Copy"}, 500
