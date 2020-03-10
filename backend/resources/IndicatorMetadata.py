import traceback
from utils import utils
from flask import request
from flask_restful import Resource


class IndicatorMetadata(Resource):
    def post(self):
        try:
            # lms = request.get_json()['lms']

            return []
            # return utils.execute_query(query)

        except:
            traceback.print_exc()
            return {"msg": "Error on GET Indicator Metadata"}, 500