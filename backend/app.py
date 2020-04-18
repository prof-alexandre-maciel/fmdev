from flask import Blueprint
from flask_restful import Api
from resources.Lms import LmsResource
from resources.Login import Login
from resources.Subject import Subject
from resources.Course import Course
from resources.Chart import Chart
from resources.Register import Register
from resources.Semester import Semester
from resources.Indicator import Indicator
from resources.PreProcessing import PreProcessing
from resources.Train import Train
from resources.TrainStatus import TrainStatus
from resources.TrainModel import TrainModelResource
from resources.TrainMetric import TrainMetric
from resources.ModelCopy import ModelCopy
from resources.Predict import Predict
from resources.Download import Download

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Routes
api.add_resource(Login, '/auth/login')
api.add_resource(Register, '/auth/register')
api.add_resource(LmsResource, '/lms')
api.add_resource(Subject, '/subject')
api.add_resource(Course, '/course')
api.add_resource(Semester, '/semester')
api.add_resource(Indicator, '/indicator')
api.add_resource(PreProcessing, '/pre-processing')
api.add_resource(Chart, '/chart')
api.add_resource(Train, '/train')
api.add_resource(TrainStatus, '/train-status')
api.add_resource(TrainModelResource, '/train-model')
api.add_resource(TrainMetric, '/train-metric')
api.add_resource(ModelCopy, '/model-copy/<string:key>')
api.add_resource(Predict, '/predict/<string:key>')
api.add_resource(Download, '/download/<string:key>')