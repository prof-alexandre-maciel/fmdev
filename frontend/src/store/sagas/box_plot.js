import api from '../../services/api';
import { Creators } from '../ducks/box_plot';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getBoxPlot({ filter }) {
  try {
    let response;

    yield put(Creators.boxPlotRequest());
    response = yield call(api.post, 'box-plot', filter);

    yield put(Creators.boxPlotSuccess(response.data, filter.chartType));
  } catch (err) {
    yield put(Creators.boxPlotError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao exibir Box Plot'
    }));
  }
}