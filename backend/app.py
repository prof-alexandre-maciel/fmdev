from flask import Blueprint
from flask_restful import Api
from resources.Auth import Auth

api_bp = Blueprint('api', __name__)
api = Api(api_bp)
# Routes

api.add_resource(Auth, '/login')
