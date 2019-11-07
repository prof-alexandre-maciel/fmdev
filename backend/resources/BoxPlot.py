import pandas as pd
from flask import request
from flask_restful import Resource

df = pd.read_csv('base.csv', index_col=0)
df.columns = [item.upper() for item in df.columns]

class BoxPlotResource(Resource):
    def post(self):
        items = []
        feature = ''
        incoming = request.get_json()

        if len(incoming["feature"]) == 0:
            return {"status":"success", "data": items}, 200
        
        feature = incoming["feature"]

        for cluster in df['CLUSTER'].unique():
            name = 'Cluster ' + str(cluster)
            values = df[df['CLUSTER'] == cluster][feature].tolist()
            items.append({"name": name, "y": values, "type": 'box'})

        return {"status":"success", "data": items}, 200