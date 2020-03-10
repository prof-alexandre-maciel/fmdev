import api from '../../services/api';
import { Creators } from '../ducks/indicator';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getIndicators({ filter }) {
  try {
    yield put(Creators.indicatorRequest());
    const response = yield call(api.post, 'indicator', filter);

    yield put(Creators.indicatorSuccess(response.data));
  } catch (err) {
    yield put(Creators.indicatorError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar Indicadores'
    }));
  }
}

export function* saveIndicators() {
  try {
    yield put(Creators.indicatorRequest());
    const response = yield call(api.post, 'indicator');

    yield put(Creators.indicatorSuccess(response.data));
  } catch (err) {
    yield put(Creators.indicatorError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar Indicadores'
    }));
  }
}