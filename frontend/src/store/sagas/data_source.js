import api from '../../services/api';
import { Creators } from '../ducks/data_source';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getDataSource() {
  try {
    yield put(Creators.dataSourceRequest());
    const response = yield call(api.get, 'data-source');

    yield put(Creators.dataSourceSuccess(response.data));

  } catch (err) {
    yield put(Creators.dataSourceError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar fontes de dados'
    }));
  }
}