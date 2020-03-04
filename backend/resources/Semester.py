import traceback
from utils import utils
from flask import request
from flask_restful import Resource


class Semester(Resource):
    def post(self):
        try:
            query = f"""SELECT 
                            semestre as label, 
                            semestre as value 
                        FROM moodle
                        GROUP BY semestre
                        ORDER BY semestre"""

            return utils.execute_query(query)

        except:
            traceback.print_exc()
            return {"msg": "Error on GET Semester"}, 500