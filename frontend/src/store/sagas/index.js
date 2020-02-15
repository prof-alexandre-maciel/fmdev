import { all, takeLatest } from 'redux-saga/effects';
import { Types as AuthTypes } from '../ducks/auth';
import { Types as LmsTypes } from '../ducks/lms';

import { signInRequest, signOutRequest } from './auth';
import { getLms, putLms } from './lms';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signInRequest),
    takeLatest(AuthTypes.SIGN_OUT_REQUEST, signOutRequest),
    takeLatest(LmsTypes.GET_LMS, getLms),
    takeLatest(LmsTypes.PUT_LMS, putLms)
  ])
}