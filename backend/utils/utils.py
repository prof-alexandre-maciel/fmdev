import json
import math
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
  

def to_float(value):
  if value is None or math.isnan(value) == True:
    return None

  new_value = "%.2f" % value
  new_value = float(new_value)

  return new_value