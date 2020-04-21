import os
import uuid
import traceback
from utils.utils import get_extension_from_path
from flask_restful import Resource
from flask import request, current_app
from flask_jwt_extended import jwt_required


class Upload(Resource):

    ALLOWED_EXTENSIONS = {'csv'}

    def allowed_file(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self.ALLOWED_EXTENSIONS

    @jwt_required
    def post(self):
        try:
            if 'file' not in request.files:
                return {'msg': 'No file part'}, 500

            file_id = str(uuid.uuid4())
            file = request.files['file']
            extension = get_extension_from_path(file.filename)
            upload_folder = current_app.config.get('UPLOAD_FOLDER')
            
            if file and self.allowed_file(file.filename):
                file.save(os.path.join(
                    current_app.config.get('UPLOAD_FOLDER'), f"{file_id}{extension}"))
            else:
                return {'msg': 'Extension file invalid'}, 500

            return { 
                'id': file_id,
                'filename': file.filename,
                'url': f"{upload_folder}/{file_id}{extension}"
             }
        except:
            traceback.print_exc()
            return {'msg': f"Error on upload file"}, 500
