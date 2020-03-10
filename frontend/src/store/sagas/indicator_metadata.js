import api from '../../services/api';
import { Creators } from '../ducks/indicator_metadata';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getIndicatorMetadata({ filter }) {
  try {
    yield put(Creators.indicatorMetadataRequest());
    const response = yield call(api.post, 'indicator-metadata', filter);

    yield put(Creators.indicatorMetadataSuccess(response.data));
  } catch (err) {
    yield put(Creators.indicatorMetadataError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar Indicadores'
    }));
  }
}