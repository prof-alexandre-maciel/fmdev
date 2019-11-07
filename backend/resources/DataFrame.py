import pandas as pd
from flask_restful import Resource

display_df = pd.read_csv('display_example.csv', index_col=0)

class DataFrameResource(Resource):
    def get(self):
        return {"status":"success", "data": display_df.to_dict("rows")}, 200