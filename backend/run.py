from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

def create_app(config_filename):
    app.config.from_object(config_filename)

    from app import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    from Model import db
    db.init_app(app)

    CORS(app)

    return app


if __name__ == "__main__":
    app = create_app("config")
    app.run(debug=True, host='0.0.0.0')
