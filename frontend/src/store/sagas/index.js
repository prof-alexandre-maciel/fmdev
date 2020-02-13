import { all, takeLatest } from 'redux-saga/effects';
import { Types as AuthTypes } from '../ducks/auth';

import { signInRequest, signOutRequest } from './auth';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signInRequest),
    takeLatest(AuthTypes.SIGN_OUT_REQUEST, signOutRequest)
  ])
}