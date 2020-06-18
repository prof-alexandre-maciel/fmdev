import { all, takeLatest } from 'redux-saga/effects';
import { Types as LmsTypes } from '../ducks/lms';
import { Types as AuthTypes } from '../ducks/auth';
import { Types as ChartTypes } from '../ducks/chart';
import { Types as CourseTypes } from '../ducks/course';
import { Types as SubjectTypes } from '../ducks/subject';
import { Types as SemesterTypes } from '../ducks/semester';
import { Types as IndicatorTypes } from '../ducks/indicator';
import { Types as PreProcessingTypes } from '../ducks/pre_processing';
import { Types as TrainTypes } from '../ducks/train';
import { Types as TrainStatusTypes } from '../ducks/train_status';
import { Types as TrainModelTypes } from '../ducks/train_model';
import { Types as TrainMetricTypes } from '../ducks/train_metric';
import { Types as ModelCopyTypes } from '../ducks/model_copy';
import { Types as DownloadTypes } from '../ducks/download';
import { Types as DataSourceTypes } from '../ducks/data_source';
import { Types as PhenomenonTypes } from '../ducks/phenomenon';

import { getChart } from './chart';
import { getDownload } from './download';
import { getModelCopy } from './model_copy';
import { postTrain, deleteTrain } from './train';
import { getLms, putLms } from './lms';
import { getCourses } from './course';
import { getSubjects } from './subject';
import { getSemesters } from './semester';
import { getIndicators } from './indicator';
import { postTrainStatus } from './train_status';
import { getTrainModel, postTrainModel, deleteTrainModel, putTrainModel } from './train_model';
import { postTrainMetric } from './train_metric';
import { signInRequest, signOutRequest } from './auth';
import { getPreProcessing, deletePreProcessing } from './pre_processing';
import { getDataSource, postDataSource, deleteDataSource } from './data_source';
import { getPhenomenon } from './phenomenon';

export default function* rootSaga() {
  return yield all([
    takeLatest(ChartTypes.GET_CHART, getChart),
    takeLatest(DownloadTypes.GET_DOWNLOAD, getDownload),
    takeLatest(ModelCopyTypes.GET_MODEL_COPY, getModelCopy),
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signInRequest),
    takeLatest(AuthTypes.SIGN_OUT_REQUEST, signOutRequest),
    takeLatest(LmsTypes.GET_LMS, getLms),
    takeLatest(LmsTypes.PUT_LMS, putLms),
    takeLatest(CourseTypes.GET_COURSES, getCourses),
    takeLatest(SubjectTypes.GET_SUBJECTS, getSubjects),
    takeLatest(SemesterTypes.GET_SEMESTERS, getSemesters),
    takeLatest(IndicatorTypes.GET_INDICATORS, getIndicators),
    takeLatest(PreProcessingTypes.GET_PRE_PROCESSING, getPreProcessing),
    takeLatest(PreProcessingTypes.DELETE_PRE_PROCESSING, deletePreProcessing),
    takeLatest(TrainTypes.POST_TRAIN, postTrain),
    takeLatest(TrainTypes.DELETE_TRAIN, deleteTrain),
    takeLatest(TrainStatusTypes.POST_TRAIN_STATUS, postTrainStatus),
    takeLatest(TrainModelTypes.GET_TRAIN_MODEL, getTrainModel),
    takeLatest(TrainModelTypes.POST_TRAIN_MODEL, postTrainModel),
    takeLatest(TrainModelTypes.PUT_TRAIN_MODEL, putTrainModel),
    takeLatest(TrainModelTypes.DELETE_TRAIN_MODEL, deleteTrainModel),
    takeLatest(TrainMetricTypes.POST_TRAIN_METRIC, postTrainMetric),
    takeLatest(DataSourceTypes.GET_DATA_SOURCE, getDataSource),
    takeLatest(DataSourceTypes.POST_DATA_SOURCE, postDataSource),
    takeLatest(DataSourceTypes.DELETE_DATA_SOURCE, deleteDataSource),
    takeLatest(PhenomenonTypes.GET_PHENOMENON, getPhenomenon)
  ])
}