import pandas as pd
from flask_restful import Resource

display_df = pd.read_csv('display_example.csv', index_col=0)

class DataFrameLabelsResource(Resource):
    def get(self):
        return {"status":"success", "data": [{'label': i, 'value':i} for i in display_df.columns]}, 200