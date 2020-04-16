import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  preProcessingInit: [],
  preProcessingSetFilter: ['filter'],
  preProcessingRequest: [],
  preProcessingSuccess: ['data'],
  preProcessingError: ['err'],
  getPreProcessing: ['filter'],

  deletePreProcessing: ['filter'],
  preProcessingDeleteRequest: [],
  preProcessingDeleteSuccess: ['data'],
  preProcessingDeleteError: ['err'],
});

/** --------------------------------
 * Variable declarations
 * --------------------------------- */

// const INITIAL_STATE = Immutable({
//   "data": [
//     {
//       "name": "desempenho_binario",
//       "description": "DESEMPENHO_BINARIO",
//       "type": "Discreto",
//       "missing": 0,
//       "unique": 2,
//       "count": 1286,
//       "mean": 0.33,
//       "std": 0.47,
//       "min": 0.0,
//       "25%": 0.0,
//       "50%": 0.0,
//       "75%": 1.0,
//       "max": 1.0,
//       "corr": null
//     },
//     {
//       "name": "var01",
//       "description": "VAR01",
//       "type": "Discreto",
//       "missing": 0,
//       "unique": 87,
//       "count": 1286,
//       "mean": 26.71,
//       "std": 30.74,
//       "min": 0.0,
//       "25%": 7.0,
//       "50%": 16.0,
//       "75%": 36.0,
//       "max": 268.0,
//       "corr": -0.23
//     },
//     {
//       "name": "var02",
//       "description": "VAR02",
//       "type": "Discreto",
//       "missing": 0,
//       "unique": 13,
//       "count": 1286,
//       "mean": 0.7,
//       "std": 1.65,
//       "min": 0.0,
//       "25%": 0.0,
//       "50%": 0.0,
//       "75%": 1.0,
//       "max": 19.0,
//       "corr": -0.27
//     },
//     {
//       "name": "var03",
//       "description": "VAR03",
//       "type": "Discreto",
//       "missing": 0,
//       "unique": 69,
//       "count": 1286,
//       "mean": 9.24,
//       "std": 17.02,
//       "min": 0.0,
//       "25%": 0.0,
//       "50%": 3.0,
//       "75%": 11.0,
//       "max": 147.0,
//       "corr": -0.07
//     },
//     {
//       "name": "var04",
//       "description": "VAR04",
//       "type": "Discreto",
//       "missing": 0,
//       "unique": 113,
//       "count": 1286,
//       "mean": 39.13,
//       "std": 59.92,
//       "min": 0.0,
//       "25%": 6.0,
//       "50%": 20.0,
//       "75%": 52.0,
//       "max": 572.0,
//       "corr": -0.22
//     },
//     {
//       "name": "var05",
//       "description": "VAR05",
//       "type": "Discreto",
//       "missing": 0,
//       "unique": 170,
//       "count": 1286,
//       "mean": 75.38,
//       "std": 58.74,
//       "min": 0.0,
//       "25%": 30.0,
//       "50%": 65.0,
//       "75%": 106.0,
//       "max": 450.0,
//       "corr": -0.09
//     }
//   ],
//   "path": "data/pre_processing/704b3e23-2821-4d77-b41e-9de06e91f15a.csv",
//   "is_processed": false,
//   filter: null,
//   loading: false,
//   error: false,
//   deleteLoading: false,
//   deleteError: false
// });

const INITIAL_STATE = Immutable({
  data: [],
  path: null,
  is_processed: false,
  filter: null,
  loading: false,
  error: false,
  deleteLoading: false,
  deleteError: false
});

/* Reducers */

export const init = state => state.merge({ ...INITIAL_STATE });

export const request = state => state.merge({ loading: true });

export const success = (state, { data }) => state.merge({
  data: data.data,
  path: data.path,
  is_processed: data.is_processed,
  error: false,
  loading: false
});

export const error = state => state.merge({ loading: false, error: true });

export const setFilter = (state, { filter }) => state.merge({ filter });

/* Delete Reducers */

export const deleteRequest = state => state.merge({ deleteLoading: true });

export const deleteSuccess = state => state.merge({ data: { ...INITIAL_STATE }, deleteLoading: false, deleteError: false });

export const deleteError = state => state.merge({ deleteLoading: false, deleteError: true });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.PRE_PROCESSING_INIT]: init,
  [Types.PRE_PROCESSING_REQUEST]: request,
  [Types.PRE_PROCESSING_SUCCESS]: success,
  [Types.PRE_PROCESSING_ERROR]: error,
  [Types.PRE_PROCESSING_SET_FILTER]: setFilter,

  [Types.PRE_PROCESSING_DELETE_REQUEST]: deleteRequest,
  [Types.PRE_PROCESSING_DELETE_SUCCESS]: deleteSuccess,
  [Types.PRE_PROCESSING_DELETE_ERROR]: deleteError,
});