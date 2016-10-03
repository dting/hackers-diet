import { types } from './';

const initialState = {
  _id: null,
  createdAt: null,
  email: null,
  google: null,
  name: null,
  updatedAt: null,
  pending: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.USER_CHECK_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.USER_CHECK_FULFILLED:
      const user = action.payload;
      return {
        ...state,
        ...user,
        pending: false,
      };
    case types.USER_UNSET:
    case types.USER_CHECK_REJECTED:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
