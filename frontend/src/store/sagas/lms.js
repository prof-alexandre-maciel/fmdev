import api from '../../services/api';
import { Creators } from '../ducks/lms';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getLms() {
  try {
    yield put(Creators.lmsRequest());
    const response = yield call(api.get, 'lms');

    yield put(Creators.lmsSuccess(response.data));
  } catch (err) {
    yield put(Creators.lmsError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar LMS'
    }));
  }
}