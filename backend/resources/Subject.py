import traceback
from utils import utils
from flask import request
from flask_restful import Resource


class Subject(Resource):
    def post(self):
        try:
            query = f"""SELECT 
                            nome_da_disciplina as label, 
                            nome_da_disciplina as value 
                        FROM moodle
                        GROUP BY nome_da_disciplina
                        ORDER BY nome_da_disciplina"""

            return utils.execute_query(query)

        except:
            traceback.print_exc()
            return {"msg": "Error on get Subject"}, 500