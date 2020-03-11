import json
import traceback
import pandas as pd
from Model import db

def execute_query(query, mode='sql'):

  data = []

  res = db.engine.execute(query)

  for item in res:
      data.append(item)

  df = pd.DataFrame(data, columns=res.keys())

  if mode == 'pandas':
    return df

  data = df.to_json(orient='records', force_ascii=False)
  data = json.loads(data)
  
  return data


def list_to_sql_string(data):
    string = ''

    string = "', '".join(data)
    string = f"'{string}'"

    return string