import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  trainStatusInit: [],
  postTrainStatus: ['filter'],
  trainStatusRequest: [],
  trainStatusSuccess: ['data'],
  trainStatusError: ['err']
});

/** --------------------------------
 * Variable declarations
 * --------------------------------- */

// const INITIAL_STATE = Immutable({
//   data: [
//     {
//       "date": "2020-04-12T20:36:54",
//       "step": "Treinamento 1",
//       "status": "Finalizado",
//       "score": 0.7
//     },
//     {
//       "date": "2020-04-12T20:37:31",
//       "step": "Treinamento 2",
//       "status": "Finalizado",
//       "score": 0.71
//     },
//     {
//       "date": "2020-04-12T20:38:26",
//       "step": "Treinamento 3",
//       "status": "Finalizado",
//       "score": 0.71
//     }
//   ]
//   ,
//   loading: false,
//   error: false
// });

const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  error: false
});

/* Reducers */

export const init = state => state.merge({ ...INITIAL_STATE });

export const request = state => state.merge({ loading: true });

export const success = (state, { data }) => state.merge({ data, loading: false, error: false });

export const error = state => state.merge({ loading: false, error: true });

export const setFilter = (state, { filter }) => state.merge({ filter });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.TRAIN_STATUS_INIT]: init,
  [Types.TRAIN_STATUS_REQUEST]: request,
  [Types.TRAIN_STATUS_SUCCESS]: success,
  [Types.TRAIN_STATUS_ERROR]: error,
});