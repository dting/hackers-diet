import { types } from './';

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.DEMO_WEIGHT_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.DEMO_WEIGHT_FULFILLED:
      return {
        ...state,
        data: action.payload,
        pending: false,
      };
    case types.DEMO_WEIGHT_REJECTED:
      return {
        ...initialState,
        pending: false,
      };
    default:
      return state;
  }
}
