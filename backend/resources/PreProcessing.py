import json
import traceback
from utils import utils
from flask import request
from scipy.stats import spearmanr
from flask_restful import Resource


class PreProcessing(Resource):

    def get_corr(self, df):
        correlation_items = {}
        payload = request.get_json()

        target_col_name = 'desempenho'

        for col in df:
            try:
                if target_col_name != col:
                    correlation_items[col] = spearmanr(
                        df[col], df[target_col_name])[0]
            except:
                pass

        return correlation_items

    def get_indicators_description(self):
        descriptions = {}
        payload = request.get_json()
        lms = payload['lms']

        query = f"""SELECT 
                        name,
                        description
                    FROM
                        indicators
                    WHERE 
                        lms='{lms}'
                    AND
                        name IN ({utils.list_to_sql_string(payload['indicators'])})
                    GROUP BY 
                        name, description, lms
                """

        data = utils.execute_query(query)

        for item in data:
            descriptions[item['name']] = item['description']

        return descriptions

    def post(self):
        try:
            data = []

            query_where = ''
            where = 'WHERE'
            fields = "*"
            group_by = ''

            null_items = {}
            type_items = {}
            unique_items = {}
            overview_items = {}
            correlation_items = {}

            payload = request.get_json()
            indicators_description = self.get_indicators_description()

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

            df = utils.execute_query(query=query, mode='pandas')

            correlation_items = self.get_corr(df)
            overview_items = json.loads(
                df.describe().to_json(force_ascii=False))
            null_items = df.isna().sum().apply(lambda x: x).to_dict()

            for column in df.columns:
                unique_items[column] = df[column].nunique()

            for column in df.columns:
                corr = None
                type_column = 'Categórico'
                descriptive = {
                    "count": None,
                    "mean": None,
                    "std": None,
                    "min": None,
                    "25%": None,
                    "50%": None,
                    "75%": None,
                    "max": None
                }

                if column in overview_items:
                    descriptive = overview_items[column]
                    type_column = 'Discreto'

                if column in correlation_items:
                    corr = utils.to_float(correlation_items[column])

                item = {
                    'name': column,
                    'description': indicators_description[column],
                    'type': type_column,
                    'missing': null_items[column],
                    'unique': unique_items[column],
                    'count': len(df.index),
                    'mean': utils.to_float(descriptive['mean']),
                    "std": utils.to_float(descriptive['std']),
                    "min": utils.to_float(descriptive['min']),
                    "25%": utils.to_float(descriptive['25%']),
                    "50%": utils.to_float(descriptive['50%']),
                    "75%": utils.to_float(descriptive['75%']),
                    "max": utils.to_float(descriptive['max']),
                    "corr": corr
                }

                data.append(item)

            return data

        except:
            traceback.print_exc()
            return {"msg": "Error on GET Indicator Metadata"}, 500
