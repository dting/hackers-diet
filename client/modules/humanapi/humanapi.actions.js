import moment from 'moment';

import { types } from './';
import api from '../util/util.api';

const actions = {};

const average = weights => weights.reduce((a, b) => a + b) / weights.length;

const reshape = data => data.map(e => ({
  time: new Date(e.timestamp).getTime(),
  weight: e.value,
  unit: e.unit,
}));

const combineByDate = (data) => {
  if (!data || !data.length) { return []; }

  const dates = Object.create(null);
  data.forEach((item) => {
    const key = moment(item.time).startOf('day');
    if (!(key in dates)) dates[key] = [];
    dates[key].push(item);
  });
  return Object.keys(dates).map((key, i) => ({
    time: new Date(key).getTime(),
    weight: average(dates[key].map(item => item.weight)),
    unit: dates[key][0].unit,
    id: i,
  })).sort((a, b) => a.time - b.time);
};

const calculateTrend = (data) => {
  let trend;
  return data.map((item, index) => {
    trend = index ? trend + (0.1 * (item.weight - trend)) : item.weight;
    return { ...item, trend };
  });
};

actions.getWeightReadings = function getWeightReadings(token = 'demo') {
  const controller = token === 'demo' ? 'demos' : 'users';
  return (dispatch) => {
    const promise = fetch(`/api/${controller}/weight`, api.jsonGetOptions(token))
      .then(api.checkStatus)
      .then(api.parseJson)
      .then(reshape)
      .then(combineByDate)
      .then(calculateTrend);

    return dispatch({
      type: types.HUMANAPI_GET_WEIGHT_READINGS,
      payload: promise,
    });
  };
};

actions.clearWeightReadings = function clearWeightReadings() {
  return {
    type: types.HUMANAPI_CLEAR_WEIGHT_READINGS,
  };
};

export default actions;
