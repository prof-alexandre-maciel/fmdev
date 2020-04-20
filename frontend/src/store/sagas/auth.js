import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import { Creators } from '../ducks/auth';
import { Creators as ScreenCreators } from '../ducks/screen';
import { DATASOURCE, ADD_TRAIN } from '../../constants';


export function* signInRequest({ email, password }) {

  try {
    const response = yield call(api.post, 'auth/login', { email, password });

    localStorage.setItem('@fmdev:token', response.data.token);
    yield put(Creators.signInSuccess(response.data.token));
    yield put(push('/'));
  } catch (err) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Falha no login',
      message: 'Verifique seu e-mail/senha'
    }));
  }
}

export function* signOutRequest() {
  localStorage.removeItem('@fmdev:token');

  yield put(Creators.signOutSuccess());
  yield put(push('/'));
  yield put(ScreenCreators.setScreen(ADD_TRAIN, DATASOURCE));
}