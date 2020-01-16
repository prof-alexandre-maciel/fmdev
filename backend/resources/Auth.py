from flask_restful import Resource


class Auth(Resource):
    def get(self):
        return {"message": "Hello, World!"}
