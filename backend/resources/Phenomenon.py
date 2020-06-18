import traceback
import pandas as pd
from utils import utils
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required


class Phenomenon(Resource):

    @jwt_required
    def get(self):
        try:
            query = f"""SELECT 
                            model_id as value, 
                            name as label
                        FROM 
                            train_models
                        ORDER BY 
                            name"""

            return utils.execute_query(query)

        except:
            traceback.print_exc()
            return {"msg": "Error on GET Phenomenon"}, 500
