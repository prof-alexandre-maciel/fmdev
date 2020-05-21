import os
from environs import Env

env = Env()

if os.environ.get('FLASK_ENV') is None or os.environ.get('FLASK_ENV') == 'production':
    env.read_env()
else:
    env.read_env('.env.development')

# You need to replace the next values with the appropriate values for your configuration

basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = f"postgresql://{env.str('DB_USER')}:{env.str('DB_PWD')}@{env.str('DB_HOST')}:{env.str('DB_PORT')}/{env.str('DB_NAME')}"
JWT_SECRET_KEY = 'secret'
PRE_PROCESSING_RAW = 'data/pre_processing'
TRAIN_MODELS = 'data/models'
TRAIN_PIPELINES = 'data/pipelines'
TRAIN_TPOT_OUTPUT = 'data/tpot/output'
PRE_PROCESSING_ENRICHED = 'data/enriched'
TRAIN_FEATURES = 'data/train/features'
TRAIN_TARGET = 'data/train/target'
TEST_FEATURES = 'data/test/features'
TEST_TARGET = 'data/test/target'
BASE_URL = 'http://localhost:5000'
UPLOAD_FOLDER = 'data/upload'