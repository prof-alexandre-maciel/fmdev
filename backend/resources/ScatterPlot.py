import pandas as pd
from flask import request
from flask_restful import Resource

df = pd.read_csv('base.csv', index_col=0)
df.columns = [item.upper() for item in df.columns]

class ScatterPlotResource(Resource):
    def post(self):
        items = []
        items_anomaly = []

        featureX = ''
        featureY = ''
        incoming = request.get_json()

        if len(incoming["feature_x"]) == 0 or len(incoming["feature_y"]) == 0:
            return {"status":"success", "data": items}, 200
        
        featureX = incoming["feature_x"]
        featureY = incoming["feature_y"]

        for cluster in df['CLUSTER'].unique():
            dataX = df[ (df['CLUSTER']==cluster) & (df['ANOMALY'] == 1) ][featureX]
            dataY = df[ (df['CLUSTER']==cluster) & (df['ANOMALY'] == 1) ][featureY]

            items.append({
                "x": dataX.tolist(), 
                "y": dataY.tolist(), 
                "mode": 'markers',
                "name": 'Cluster ' + str(cluster) + ' sem poss. anom.',
                "marker": dict(size=10, line=dict(width=1.5))
                })

        items_anomaly.append({
            "x": df[df['ANOMALY'] == -1][featureX].tolist(), 
            "y": df[df['ANOMALY'] == -1][featureY].tolist(), 
            "mode": 'markers',
            "name": 'Poss. Anomalia',
            "text": list(map(lambda x: 'Cluster ' + x, map(str, df[df['ANOMALY'] == -1]['CLUSTER'].values))),
            "marker": dict(
                size = 12.5,
                color = 'rgb(255,0,0)',
                line = dict(
                    width=1.5
                    )
                )
            })

        items.extend(items_anomaly)

        return {"status":"success", "data": items}, 200