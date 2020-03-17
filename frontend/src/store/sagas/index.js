import { all, takeLatest } from 'redux-saga/effects';
import { Types as AuthTypes } from '../ducks/auth';
import { Types as LmsTypes } from '../ducks/lms';
import { Types as CourseTypes } from '../ducks/course';
import { Types as SubjectTypes } from '../ducks/subject';
import { Types as SemesterTypes } from '../ducks/semester';
import { Types as IndicatorTypes } from '../ducks/indicator';
import { Types as IndicatorMetadataTypes } from '../ducks/pre_processing';

import { signInRequest, signOutRequest } from './auth';
import { getLms, putLms } from './lms';
import { getCourses } from './course';
import { getSubjects } from './subject';
import { getSemesters } from './semester';
import { getIndicators } from './indicator';
import { getIndicatorMetadata } from './pre_processing';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signInRequest),
    takeLatest(AuthTypes.SIGN_OUT_REQUEST, signOutRequest),
    takeLatest(LmsTypes.GET_LMS, getLms),
    takeLatest(LmsTypes.PUT_LMS, putLms),
    takeLatest(CourseTypes.GET_COURSES, getCourses),
    takeLatest(SubjectTypes.GET_SUBJECTS, getSubjects),
    takeLatest(SemesterTypes.GET_SEMESTERS, getSemesters),
    takeLatest(IndicatorTypes.GET_INDICATORS, getIndicators),
    takeLatest(IndicatorMetadataTypes.GET_PRE_PROCESSING, getIndicatorMetadata),
  ])
}