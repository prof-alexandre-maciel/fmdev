import datetime
from Model import db
from Model import User
from run import bcrypt
from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token


class Login(Resource):
    def post(self):
        email = request.get_json()['email']
        password = request.get_json()['password']

        user = User.query \
            .with_entities(User.password, User.username) \
            .filter_by(email=email).first()

        if bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(
                identity={'username': user.username})
            result = {"token": access_token}
        else:
            result = {"error": "Invalid username and password"}

        return {"data": result}
