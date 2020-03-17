import os

# You need to replace the next values with the appropriate values for your configuration

basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI = "postgresql://raniel:@localhost/fmdev"
JWT_SECRET_KEY = 'secret'
PRE_PROCESSING_RAW = 'data/raw'
PRE_PROCESSING_ENRICHED = 'data/enriched'