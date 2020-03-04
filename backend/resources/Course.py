import traceback
from utils import utils
from flask import request
from flask_restful import Resource


class Course(Resource):
    def post(self):
        try:
            query = f"""SELECT 
                            curso as label, 
                            curso as value 
                        FROM moodle
                        GROUP BY curso
                        ORDER BY curso"""

            return utils.execute_query(query)

        except:
            traceback.print_exc()
            return {"msg": "Error on GET Course"}, 500