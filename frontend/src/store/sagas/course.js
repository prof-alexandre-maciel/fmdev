import api from '../../services/api';
import { Creators } from '../ducks/course';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getCourses({ filter }) {
  try {
    yield put(Creators.courseRequest());
    const response = yield call(api.post, 'course', filter);

    yield put(Creators.courseSuccess(response.data));
  } catch (err) {
    yield put(Creators.courseError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar Cursos'
    }));
  }
}