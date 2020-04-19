import secrets
import traceback
from Model import db
from utils import utils
from flask_restful import Resource
from flask import request, current_app
from Model import TrainModel, TrainModelSchema
from flask_jwt_extended import jwt_required

class TrainModelResource(Resource):

    @jwt_required
    def get(self):
        try:
            user_id = utils.get_user_id(request)
            res = TrainModel.query.filter_by(user_id=user_id).all()

            schema = TrainModelSchema(many=True)
            data = schema.dump(res)

            return data

        except:
            traceback.print_exc()
            return None, 500

    @jwt_required
    def post(self):
        try:
            user_id = utils.get_user_id(request)
            model_id = utils.get_filename_from_path(request, '')

            data = request.get_json()

            train_model = TrainModel(
                name=data['name'],
                description=data['description'],
                model_id=model_id,
                score=data['score'],
                user_id=user_id,
                api_key=secrets.token_hex()
            )

            db.session.add(train_model)
            db.session.commit()

            schema = TrainModelSchema(exclude=("id"))
            result = schema.dump(train_model)

            return self.get()

        except:
            traceback.print_exc()
            return [], 500
    
    @jwt_required
    def put(self, key):
        try:
            payload = request.get_json()
          
            model = TrainModel.query.filter_by(model_id=key).first()

            if 'action' in payload and payload['action'] == 'GENERATE_KEY':
                 model.api_key = secrets.token_hex()

            db.session.add(model)
            db.session.commit()

            return self.get()
        
        except:
            traceback.print_exc()
            return [], 500

    @jwt_required
    def delete(self, key):
        try:
            model = TrainModel.query.filter_by(model_id=key).first()

            utils.delete_model_files(key)
            utils.delete_file(f"{current_app.config.get('PRE_PROCESSING_RAW')}/{key}.csv")
            db.session.delete(model)
            db.session.commit()

            return self.get()

        except:
            traceback.print_exc()
            return {'msg': f"Error to delete train model"}, 500
