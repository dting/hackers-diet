import { types } from './';

const initialState = {
  _id: null,
  username: null,
  provider: null,
  google: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.USER_SET:
      return {
        ...initialState,
        ...action.response,
      };
    case types.USER_UNSET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
