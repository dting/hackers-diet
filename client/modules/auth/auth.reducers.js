import { types } from './';

const initialState = {
  token: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.AUTH_UNSET_TOKEN:
      return {
        ...initialState,
      };
    case types.AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}
