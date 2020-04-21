import os
import jwt
import json
import math
import shutil
import traceback
import pandas as pd
from Model import db
from flask import current_app


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


def delete_file(path):
    if os.path.exists(path):
        os.remove(path)
    else:
        print(f"The file {path} does not exist")


def get_user_id(request):
    user_id = None
    encoded_jwt = request.headers['Authorization']
    encoded_jwt = encoded_jwt.replace('Bearer ', '')

    decoded_jwt = jwt.decode(encoded_jwt, verify=False)

    if 'identity' in decoded_jwt:
        if 'id' in decoded_jwt['identity']:
            user_id = decoded_jwt['identity']['id']

    return user_id


def get_filename_from_path(request, extension):
    payload = request.get_json()
    path = payload['path']
    filename = os.path.basename(path).replace('.csv', extension)

    return filename


def delete_model_files(filename):
    shutil.rmtree(
        f"{current_app.config.get('TRAIN_TPOT_OUTPUT')}/{filename}", ignore_errors=True)
    delete_file(
        f"{current_app.config.get('TRAIN_MODELS')}/{filename}.sav")
    delete_file(
        f"{current_app.config.get('TRAIN_FEATURES')}/{filename}.csv")
    delete_file(
        f"{current_app.config.get('TRAIN_TARGET')}/{filename}.csv")
    delete_file(
        f"{current_app.config.get('TEST_FEATURES')}/{filename}.csv")
    delete_file(
        f"{current_app.config.get('TEST_TARGET')}/{filename}.csv")
    delete_file(
        f"{current_app.config.get('TRAIN_PIPELINES')}/{filename}.py")


def get_extension_from_path(filename):
    filename, file_extension = os.path.splitext(filename)

    return file_extension