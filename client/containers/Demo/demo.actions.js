import { types } from './';
import api from '../../modules/util/util.api';

const actions = {};

actions.weight = function weight() {
  return (dispatch) => {
    const promise = fetch('/api/demos/weight', api.jsonGetOptions())
      .then(api.checkStatus)
      .then(api.parseJson);

    return dispatch({
      type: types.DEMO_WEIGHT,
      payload: promise,
    });
  };
};

export default actions;
