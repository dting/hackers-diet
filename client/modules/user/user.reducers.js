import { types } from './';

const initialState = {
  _id: null,
  createdAt: null,
  email: null,
  google: null,
  name: null,
  updatedAt: null,
  humanId: null,
  publicToken: null,
  pending: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.USER_CONNECT_PENDING:
    case types.USER_CHECK_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.USER_CONNECT_FULFILLED:
    case types.USER_CHECK_FULFILLED:
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    case types.USER_UNSET:
    case types.USER_CHECK_REJECTED:
      return {
        ...initialState,
        pending: false,
      };
    case types.USER_CONNECT_REJECTED:
      return {
        ...state,
        pending: false,
      };
    default:
      return state;
  }
}
