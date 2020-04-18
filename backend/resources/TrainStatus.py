import os
import glob
import datetime
import traceback
import collections
from utils import utils
from flask import request, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required

class TrainStatus(Resource):

    def get_filename_from_path(self, extension):
        payload = request.get_json()
        path = payload['path']
        filename = os.path.basename(path).replace('.csv', extension)

        return filename
    
    def get_files_from_dir(self, output_folder):
        filenames = {}
        files = [f for f in glob.glob(output_folder + "**/*.py", recursive=True)]

        for f in files:
            key = os.path.basename(f)
            filenames[key] = f

        filenames = collections.OrderedDict(sorted(filenames.items()))
        
        return filenames
    
    def get_score_from_content(self, file):
        score = None

        with open(file) as fp:
                line = fp.readline()
                cnt = 1
                while line:
                    content = line.strip()
                    text_cv_score = '# Average CV score on the training set was: '
                        
                    if text_cv_score in content:
                        score = line.strip().replace(text_cv_score, '')
                    line = fp.readline()
                    cnt += 1
        
        return score
    
    def get_date_from_filename(self, filename):
        date_string = filename[-22:-3]

        year = int(date_string[0:4])
        month = int(date_string[5:7])
        day = int(date_string[8:10])
        hour = int(date_string[11:13])
        minute = int(date_string[14:16])
        second = int(date_string[17:19])

        return datetime.datetime(year, month, day, hour, minute, second).isoformat()
    
    @jwt_required
    def post(self):
        try:
            data = []
            data_obj = {}
            filename = self.get_filename_from_path('')
            output_folder = f"{current_app.config.get('TRAIN_TPOT_OUTPUT')}/{filename}"
            od_files = self.get_files_from_dir(output_folder)

            for idx, file in enumerate(od_files.values()):
               score = self.get_score_from_content(file)
               date = self.get_date_from_filename(file)

               data_obj[date] = {
                   'date': date,
                   'status': 'Finalizado',
                   'score': utils.to_float(float(score))
               }
            
            for idx, item in enumerate(data_obj):
                data.append({
                    'date': data_obj[item]['date'],
                    'step': f"Treinamento {idx + 1}",
                    'status': 'Finalizado',
                    'score': data_obj[item]['score']
                })
            
            return data
        except:
            traceback.print_exc()
            return {"msg": "Error on POST train-status"}, 500