import { all, takeLatest } from 'redux-saga/effects';

import { RepositoriesTypes } from './repositories/types';
import { AuthTypes } from './auth/types';
import { load } from './repositories/sagas';
import { signIn } from './auth/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(RepositoriesTypes.LOAD_REQUEST, load),
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
  ])
}