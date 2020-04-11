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

import { getChart } from './chart';
import { postTrain } from './train';
import { getLms, putLms } from './lms';
import { getCourses } from './course';
import { getSubjects } from './subject';
import { getSemesters } from './semester';
import { getIndicators } from './indicator';
import { postTrainStatus } from './train_status';
import { signInRequest, signOutRequest } from './auth';
import { getPreProcessing } from './pre_processing';

export default function* rootSaga() {
  return yield all([
    takeLatest(ChartTypes.GET_CHART, getChart),
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signInRequest),
    takeLatest(AuthTypes.SIGN_OUT_REQUEST, signOutRequest),
    takeLatest(LmsTypes.GET_LMS, getLms),
    takeLatest(LmsTypes.PUT_LMS, putLms),
    takeLatest(CourseTypes.GET_COURSES, getCourses),
    takeLatest(SubjectTypes.GET_SUBJECTS, getSubjects),
    takeLatest(SemesterTypes.GET_SEMESTERS, getSemesters),
    takeLatest(IndicatorTypes.GET_INDICATORS, getIndicators),
    takeLatest(PreProcessingTypes.GET_PRE_PROCESSING, getPreProcessing),
    takeLatest(TrainTypes.POST_TRAIN, postTrain),
    takeLatest(TrainStatusTypes.POST_TRAIN_STATUS, postTrainStatus),
  ])
}