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

export function* postDataSource({ data }) {
  try {
    yield put(Creators.dataSourceInit());
    yield put(Creators.dataSourceRequest());
    const response = yield call(api.post, 'data-source', data);

    yield put(toastrActions.add({
      type: 'success',
      title: 'Sucesso',
      message: `Fonte de dados criada com sucesso!`
    }));

    yield put(Creators.dataSourceSuccess(response.data));
  } catch (err) {
    yield put(Creators.dataSourceError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao salvar fonte de dados'
    }));
  }
}

export function* deleteDataSource({ id }) {
  try {
    yield put(Creators.dataSourceRequest());
    const response = yield call(api.delete, `data-source/${id}`);

    yield put(Creators.dataSourceSuccess(response.data));

    yield put(toastrActions.add({
      type: 'success',
      title: 'Sucesso',
      message: `Fonte de dados removida com sucesso!`
    }));
  } catch (err) {
    yield put(Creators.dataSourceError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao excluir fonte de dados'
    }));
  }
}