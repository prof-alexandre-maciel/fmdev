import traceback
import pandas as pd
from utils import utils
from flask import request, current_app, send_file
from flask_restful import Resource
from flask_jwt_extended import jwt_required


class Download(Resource):

    def get_extension_by_file_action(self):
        file_action = request.args['action']

        if file_action == 'TRAIN_PIPELINES':
            return 'py'
        
        return 'csv'

    @jwt_required
    def get(self, key):
        try:
            file_action = request.args['action']
            extension = self.get_extension_by_file_action()
            path = f"{current_app.config.get(file_action)}/{key}.{extension}"

            return send_file(path, as_attachment=True)
            
        except:
            traceback.print_exc()
            return {"msg": "Error on GET Download"}, 500
