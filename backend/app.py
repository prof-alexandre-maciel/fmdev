from flask import Blueprint
from flask_restful import Api
from resources.Hello import Hello
from resources.Category import CategoryResource
from resources.Comment import CommentResource
from resources.DataFrame import DataFrameResource
from resources.DataFrameLabels import DataFrameLabelsResource
from resources.BoxPlot import BoxPlotResource
from resources.ScatterPlot import ScatterPlotResource

api_bp = Blueprint('api', __name__)
api = Api(api_bp)
# Routes

api.add_resource(Hello, '/hello')
api.add_resource(CategoryResource, '/category')
api.add_resource(CommentResource, '/comment')
api.add_resource(DataFrameResource, '/data-frame')
api.add_resource(DataFrameLabelsResource, '/data-frame-labels')
api.add_resource(BoxPlotResource, '/boxplot')
api.add_resource(ScatterPlotResource, '/scatterplot')