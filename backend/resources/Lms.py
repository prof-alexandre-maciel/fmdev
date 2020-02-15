import datetime
import traceback
from Model import db
from Model import Lms, LmsSchema
from flask import request
from flask_restful import Resource


class LmsResource(Resource):
    def post(self):
        try:
            data = request.get_json()
            now = datetime.datetime.now()

            lms = Lms(
                name=data['name'],
                url=data['url'],
                token=data['token'],
                created_at=now,
                updated_at=now
            )

            db.session.add(lms)
            db.session.commit()

            schema = LmsSchema(only=("name", "created_at"))
            result = schema.dump(lms)

            return result

        except:
            traceback.print_exc()
            return None, 500
