import { types } from './';

const initialState = {
  pending: false,
  unit: null,
  weightReadings: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.HUMANAPI_GET_WEIGHT_READINGS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.HUMANAPI_GET_WEIGHT_READINGS_FULFILLED:
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    case types.HUMANAPI_GET_WEIGHT_READINGS_REJECTED:
      return {
        ...state,
        pending: false,
      };
    case types.HUMANAPI_CLEAR_WEIGHT_READINGS:
      return {
        ...initialState,
      };
    case types.HUMANAPI_TOGGLE_UNITS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
