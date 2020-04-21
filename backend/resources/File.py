import os
import uuid
import traceback
from Model import db
from flask_restful import Resource
from flask import request, current_app
from flask_jwt_extended import jwt_required
from Model import FileModel, FileModelSchema
from utils.utils import get_extension_from_path, delete_file


class File(Resource):

    ALLOWED_EXTENSIONS = {'csv'}

    def allowed_file(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self.ALLOWED_EXTENSIONS
    
    def get_file_size(self, upload_folder, file_id):
        file_length = os.stat(f"{upload_folder}/{file_id}").st_size
        
        return file_length
    
    def delete_from_database(self, key):
        try:
            model = FileModel.query.filter_by(file_id=key).first()

            db.session.delete(model)
            db.session.commit()

            return model
        except:
            traceback.print_exc()
            return None
    
    def insert_on_database(self, data):
        try:
            model = FileModel(
                file_id=data['id'],
                filename=data['filename'],
                extension=data['extension'],
                size=data['size']
            )

            db.session.add(model)
            db.session.commit()

            schema = FileModelSchema()
            data = schema.dump(model)

            return data
        except:
            traceback.print_exc()
            return None


    @jwt_required
    def post(self):
        try:
            if 'file' not in request.files:
                return {'msg': 'No file part'}, 500

            file = request.files['file']
            extension = get_extension_from_path(file.filename)
            upload_folder = current_app.config.get('UPLOAD_FOLDER')
            file_id = f"{str(uuid.uuid4())}{extension}"

            if file and self.allowed_file(file.filename):
                file.save(os.path.join(upload_folder, file_id))
            else:
                return {'msg': 'Extension file invalid'}, 500
            
            data = {
                'id': file_id,
                'filename': file.filename,
                'extension': extension.replace('.', ''),
                'size': self.get_file_size(upload_folder, file_id),
                'url': f"{upload_folder}/{file_id}"
            }

            model = self.insert_on_database(data)

            return model
        except:
            traceback.print_exc()
            return {'msg': f"Error on save file"}, 500

    @jwt_required
    def delete(self, key):
        try:
            path = f"{current_app.config.get('UPLOAD_FOLDER')}/{key}"
            delete_file(path)
            self.delete_from_database(key)

            return True
        except:
            traceback.print_exc()
            return {'msg': f"Error on delete file"}, 500
