import api from '../../services/api';
import { Creators } from '../ducks/semester';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getSemesters({ filter }) {
  try {
    yield put(Creators.semesterRequest());
    const response = yield call(api.post, 'semester', filter);

    yield put(Creators.semesterSuccess(response.data));
  } catch (err) {
    yield put(Creators.semesterError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar Turmas'
    }));
  }
}