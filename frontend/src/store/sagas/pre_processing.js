import api from '../../services/api';
import { Creators } from '../ducks/pre_processing';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getIndicatorMetadata({ filter }) {
  try {
    yield put(Creators.preProcessingRequest());
    yield put(Creators.preProcessingSetFilter(filter));
    const response = yield call(api.post, 'pre-processing', filter);

    yield put(Creators.preProcessingSuccess(response.data));

    if (filter.pre_processing_indicator && filter.pre_processing_strategy) {
      yield put(toastrActions.add({
        type: 'success',
        title: 'Sucesso',
        message: `Indicador ${filter.pre_processing_indicator} pré-processado com sucesso!`
      }));
    }

  } catch (err) {
    yield put(Creators.preProcessingError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar Indicadores'
    }));
  }
}