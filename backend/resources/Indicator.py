import traceback
import pandas as pd
from utils import utils
from flask_restful import Resource
from flask import request, current_app
from flask_jwt_extended import jwt_required
from Model import FileModel, DatasourceModel


class Indicator(Resource):

    def get_indicators_by_lms(self):
        lms_id = request.get_json()['id']

        query = f"""SELECT 
                        name as value,
                        description as label
                    FROM
                        indicators
                    WHERE 
                        lms='{lms_id}'
                    GROUP BY 
                        name, description, lms
                    ORDER BY
                        name
                    """

        return utils.execute_query(query)
    
    def get_indicators_by_csv(self):
        indicators = []
        id = request.get_json()['id']
        datasource = DatasourceModel.query.filter_by(id=id).first()
        file = FileModel.query.filter_by(id=datasource.file_id).first()

        upload_folder = current_app.config.get('UPLOAD_FOLDER')
        path = f"{upload_folder}/{file.file_id}"

        df = pd.read_csv(path)

        for column in df.columns:
            indicators.append({
                'value': column,
                'label': column
            })

        return indicators


    @jwt_required
    def post(self):
        try:
            context = request.get_json()['context']

            if context == 'LMS':
                return self.get_indicators_by_lms()
            
            if context == 'CSV':
                return self.get_indicators_by_csv()
            
            return []
        except:
            traceback.print_exc()
            return {"msg": "Error on GET Indicator"}, 500