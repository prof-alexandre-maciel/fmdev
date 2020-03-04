import json
import traceback
import pandas as pd
from Model import db

def execute_query(query):
  data = []

  res = db.engine.execute(query)

  for item in res:
      data.append(item)

  df = pd.DataFrame(data, columns=res.keys())
  data = df.to_json(orient='records', force_ascii=False)
  data = json.loads(data)
  
  return data


def list_to_sql_string(data):
    string = ''

    for idx, item in enumerate(data):
        comma = ','

        if idx + 1 == len(data):
            comma = ''

        string += f"'{item}'{comma}"

    return string