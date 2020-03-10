import traceback
from utils import utils
from flask import request
from flask_restful import Resource


class IndicatorMetadata(Resource):
    def post(self):
        try:
            query_where = ''
            where = 'WHERE'
            fields = "*"
            group_by = ''

            payload = request.get_json()

            if 'indicators' in payload and type(payload['indicators']) == list:
                fields = ", ".join(payload['indicators'])
            
            if 'courses' in payload and type(payload['courses']) == list and len(payload['courses']) > 0:
                query_where += f"""{where} curso IN ({utils.list_to_sql_string(payload['courses'])}) """ 
                where = 'AND'

            if 'subjects' in payload and type(payload['subjects']) == list and len(payload['subjects']) > 0:
                query_where += f"""{where} nome_da_disciplina IN ({utils.list_to_sql_string(payload['subjects'])}) """ 
                where = 'AND'
            
            if 'semesters' in payload and type(payload['semesters']) == list and len(payload['semesters']) > 0:
                query_where += f"""{where} semestre IN ({utils.list_to_sql_string(payload['semesters'])}) """
            
            if fields != '*':
                group_by = f"GROUP BY {fields}"

            query = f"""
                        SELECT 
                            {fields}
                        FROM
                            {payload['lms']}
                            {query_where}
                            {group_by}
                    """
            
            return utils.execute_query(query)

        except:
            traceback.print_exc()
            return {"msg": "Error on GET Indicator Metadata"}, 500