import secrets
import traceback
from Model import db
from utils import utils
from datetime import datetime
from flask_restful import Resource
from flask import request, current_app
from flask_jwt_extended import jwt_required
from Model import DatasourceModel, DatasourceModelSchema

class Datasource(Resource):

    @jwt_required
    def get(self):
        try:
            res = DatasourceModel.query.all()

            schema = DatasourceModelSchema(many=True)
            data = schema.dump(res)

            return data

        except:
            traceback.print_exc()
            return {'msg': f"Error on list datasources"}, 500

    @jwt_required
    def post(self):
        try:
            data = request.get_json()

            model = DatasourceModel(
                name=data['name']
            )

            db.session.add(model)
            db.session.commit()

            return self.get()

        except:
            traceback.print_exc()
            return {'msg': f"Error on create datasource"}, 500
    
    @jwt_required
    def put(self, key):
        try:
            payload = request.get_json()
          
            model = DatasourceModel.query.filter_by(id=key).first()
            model.name = payload['name']

            db.session.add(model)
            db.session.commit()

            return self.get()
        
        except:
            traceback.print_exc()
            return {'msg': f"Error on update datasource"}, 500

    @jwt_required
    def delete(self, key):
        try:
            model = DatasourceModel.query.filter_by(id=key).first()

            # utils.delete_model_files(key)
            # utils.delete_file(f"{current_app.config.get('PRE_PROCESSING_RAW')}/{key}.csv")
            db.session.delete(model)
            db.session.commit()

            return self.get()

        except:
            traceback.print_exc()
            return {'msg': f"Error on delete datasource"}, 500
