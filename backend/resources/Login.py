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
            .with_entities(User.id, User.password, User.username) \
            .filter_by(email=email).first()
        
        if user is None:
            return {"error": "User not found"}, 401

        if bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(
                identity={'username': user.username, 'id': user.id}, expires_delta=False)
            result = {
                "refresh_token": None,
                "token": access_token,
                "type": "bearer"}
        else:
            result = {"error": "Invalid username and password"}, 401

        return result
