import datetime
from Model import db
from Model import User
from run import bcrypt
from flask import request
from flask_restful import Resource


class Register(Resource):
    def post(self):
        data = request.get_json()
        now = datetime.datetime.now()

        user = User(
            username=data['username'],
            password=bcrypt.generate_password_hash(data['password']),
            email=data['email'],
            created_at=now
        )

        db.session.add(user)
        db.session.commit()

        return {"data": {
            "username": user.username,
            "email": user.email,
            "created_at": now.strftime("%Y-%m-%d %H:%M:%S")
        }}
