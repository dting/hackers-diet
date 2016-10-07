import { types } from './';

const initialState = {
  weightReadings: [],
  pending: false,
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
        weightReadings: action.payload,
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
    default:
      return state;
  }
}
