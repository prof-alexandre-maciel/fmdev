import traceback
from utils import utils
from flask import request
from flask_restful import Resource


class Subject(Resource):
    def get(self):
        try:
            query = 'SELECT * FROM moodle LIMIT 1'

            return utils.execute_query(query)

        except:
            traceback.print_exc()
            return {"msg": "Error on get Subject"}, 500