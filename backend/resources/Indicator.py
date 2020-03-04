import traceback
from utils import utils
from flask import request
from flask_restful import Resource


class Indicator(Resource):
    def post(self):
        try:
            query = f"""SELECT 
                            name,
                            description,
                            lms
                        FROM
                            indicators
                        WHERE 
                            lms='moodle'
                        GROUP BY 
                            name, description, lms
                        ORDER BY
                            name
                        """

            return utils.execute_query(query)

        except:
            traceback.print_exc()
            return {"msg": "Error on GET Indicator"}, 500