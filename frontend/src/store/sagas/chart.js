import api from '../../services/api';
import { Creators } from '../ducks/chart';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getChart({ filter }) {
  try {
    let response;

    yield put(Creators.chartRequest());
    response = yield call(api.post, 'chart', filter);

    yield put(Creators.chartSuccess(response.data, filter.chartType));
  } catch (err) {
    yield put(Creators.chartError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao exibir gráfico'
    }));
  }
}