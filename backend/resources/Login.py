from flask_restful import Resource


class Login(Resource):
    def get(self):
        return {"message": "Hello, World!"}
