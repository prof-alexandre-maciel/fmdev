import secrets
import traceback
from Model import db
from utils import utils
from sqlalchemy import desc
from datetime import datetime
from resources.File import File
from flask_restful import Resource
from flask import request, current_app
from flask_jwt_extended import jwt_required
from Model import FileModel, DatasourceModel, DatasourceModelSchema


class Datasource(Resource):

    @jwt_required
    def get(self):
        try:
            res = db.session.query(DatasourceModel.id, DatasourceModel.created_at,
                                   DatasourceModel.name, FileModel.size) \
                .join(FileModel, DatasourceModel.file_id == FileModel.id) \
                .order_by(desc(DatasourceModel.created_at)).all()

            schema = DatasourceModelSchema(many=True)
            data = schema.dump(res)

            return data

        except:
            traceback.print_exc()
            return {'msg': f"Error on list datasources"}, 500

    @jwt_required
    def post(self):
        try:
            data = request.get_json()

            model = DatasourceModel(
                name=data['name'],
                file_id=data['file_id']
            )

            db.session.add(model)
            db.session.commit()

            return self.get()

        except:
            traceback.print_exc()
            return {'msg': f"Error on create datasource"}, 500

    @jwt_required
    def delete(self, key):
        try:
            datasource = DatasourceModel.query.filter_by(id=key).first()
            file = FileModel.query.filter_by(id=datasource.file_id).first()

            path = f"{current_app.config.get('UPLOAD_FOLDER')}/{file.file_id}"
            utils.delete_file(path)

            db.session.delete(datasource)
            db.session.commit()

            db.session.delete(file)
            db.session.commit()

            return self.get()

        except:
            traceback.print_exc()
            return {'msg': f"Error on delete datasource"}, 500
