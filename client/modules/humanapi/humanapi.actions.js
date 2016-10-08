import moment from 'moment';

import { types } from './';
import api from '../util/util.api';

const actions = {};

const average = weights => weights.reduce((a, b) => a + b) / weights.length;

const combineByDate = function combineByDate(data) {
  if (!data || !data.length) { return {}; }

  const grouped = new Map();
  const unit = data[0].unit;

  data.reverse().forEach((item) => {
    const time = new Date(moment(item.timestamp).startOf('day')).getTime();
    if (!grouped.has(time)) {
      grouped.set(time, { weights: [], time });
    }
    grouped.get(time).weights.push(item);
  });

  let trend;
  const weights = [...grouped.values()].map((item) => {
    const weight = average(item.weights.map(e => e.value));
    trend = trend ? trend + (0.1 * (weight - trend)) : weight;
    return { ...item, weight, trend };
  });

  return { weights, unit };
};

actions.getWeights = function getWeights(token = 'demo') {
  const controller = token === 'demo' ? 'demos' : 'users';
  return (dispatch) => {
    const promise = fetch(`/api/${controller}/weight`, api.jsonGetOptions(token))
      .then(api.checkStatus)
      .then(api.parseJson)
      .then(combineByDate);

    return dispatch({
      type: types.HUMANAPI_GET_WEIGHTS,
      payload: promise,
    });
  };
};

actions.clearWeights = function clearWeights() {
  return {
    type: types.HUMANAPI_CLEAR_WEIGHTS,
  };
};

const convertTo = {
  lbs(data) {
    return data.map((entry) => {
      const weight = entry.weight * 2.20462262185;
      const trend = entry.trend * 2.20462262185;
      return { ...entry, weight, trend };
    });
  },
  kg(data) {
    return data.map((entry) => {
      const weight = entry.weight * 0.45359237;
      const trend = entry.trend * 0.45359237;
      return { ...entry, weight, trend };
    });
  },
};

actions.toggleUnits = function toggleUnits() {
  return (dispatch, getState) => {
    const { humanapi } = getState();
    const unit = humanapi.unit === 'kg' ? 'lbs' : 'kg';
    const weights = convertTo[unit](humanapi.weights);
    return dispatch({
      type: types.HUMANAPI_TOGGLE_UNITS,
      data: { unit, weights },
    });
  };
};

export default actions;
