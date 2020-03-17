from flask import Blueprint
from flask_restful import Api
from resources.Lms import LmsResource
from resources.Login import Login
from resources.Subject import Subject
from resources.Course import Course
from resources.BoxPlot import BoxPlot
from resources.Register import Register
from resources.Semester import Semester
from resources.Indicator import Indicator
from resources.PreProcessing import PreProcessing

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
api.add_resource(BoxPlot, '/box-plot')