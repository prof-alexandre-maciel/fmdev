import os
import traceback
from flask_restful import Resource
from werkzeug.utils import secure_filename
from flask import request, current_app
from flask_jwt_extended import jwt_required


class Upload(Resource):

    ALLOWED_EXTENSIONS = {'csv'}

    def allowed_file(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self.ALLOWED_EXTENSIONS

    @jwt_required
    def post(self):
        try:
            file = request.files['file']

            if 'file' not in request.files:
                return {'msg': 'No file part'}, 500

            if file and self.allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(
                    current_app.config.get('UPLOAD_FOLDER'), filename))
            else:
                return {'msg': 'Extension file invalid'}, 500

            return 'file uploaded successfully'
        except:
            traceback.print_exc()
            return {'msg': f"Error on upload file"}, 500
