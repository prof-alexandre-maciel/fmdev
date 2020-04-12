import jwt
import datetime
import traceback
from Model import db
from utils import utils
from flask import request
from flask_restful import Resource
from Model import TrainModel, TrainModelSchema


class TrainModelResource(Resource):

    def get(self):
        try:
            user_id = utils.get_user_id(request)

            print(user_id)

            res = TrainModel.query.filter_by(user_id=user_id).all()

            schema = TrainModelSchema(many=True)
            data = schema.dump(res)

            return data

        except:
            traceback.print_exc()
            return None, 500

    def post(self):
        try:
            user_id = utils.get_user_id(request)
            model_id = utils.get_filename_from_path(request, '')

            data = request.get_json()
            now = datetime.datetime.now()

            train_model = TrainModel(
                name=data['name'],
                description=data['description'],
                model_id=model_id,
                user_id=user_id,
                created_at=now,
                updated_at=now
            )

            db.session.add(train_model)
            db.session.commit()

            schema = TrainModelSchema(exclude=("id"))
            result = schema.dump(train_model)

            return result

        except:
            traceback.print_exc()
            return [], 500
    

    def delete(self):
        try:
            payload = request.get_json()

            model = TrainModel.query.filter_by(id=payload['id']).first()

            db.session.delete(model)
            db.session.commit()

            return {'msg': f"Model {payload['id']} deleted with success"}

        except:
            traceback.print_exc()
            return {'msg': f"Error to delete train model"}, 500
