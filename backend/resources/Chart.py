import traceback
import pandas as pd
from utils import utils
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required


class Chart(Resource):

    def get_csv_data(self, path, indicator):
        res = {'status': 'success'}

        try:
            df = pd.read_csv(path)
            res['data'] = df[indicator]
        except:
            res['status'] = 'error'

        return res

    @jwt_required
    def post(self):
        try:
            path = None
            payload = request.get_json()

            if 'path' not in payload or payload['path'] is None:
                return {"msg": "Invalid path"}, 500

            res = self.get_csv_data(payload['path'], payload['indicator'])

            if res['status'] == 'error':
                return {"msg": "Invalid path"}, 500

            return res['data'].tolist()
        except:
            traceback.print_exc()
            return {"msg": "Error on POST Chart"}, 500
