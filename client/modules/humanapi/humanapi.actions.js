import moment from 'moment';

import { types } from './';
import api from '../util/util.api';

const actions = {};

const average = weights => weights.reduce((a, b) => a + b) / weights.length;

const combineByDate = (data) => {
  if (!data || !data.length) { return {}; }

  const dataMap = new Map();
  const unit = data[0].unit;
  data.reverse().forEach((item) => {
    const time = new Date(moment(item.timestamp).startOf('day')).getTime();
    if (!dataMap.has(time)) {
      dataMap.set(time, { readings: [item], time });
    } else {
      dataMap.get(time).readings.push(item);
    }
  });

  let trend;
  const weightReadings = [...dataMap.values()].map((item) => {
    const { readings } = item;
    const weight = average(readings.map(reading => reading.value));
    trend = trend ? trend + (0.1 * (weight - trend)) : weight;
    return { ...item, weight, trend };
  });

  return { weightReadings, unit };
};

actions.getWeightReadings = function getWeightReadings(token = 'demo') {
  const controller = token === 'demo' ? 'demos' : 'users';
  return (dispatch) => {
    const promise = fetch(`/api/${controller}/weight`, api.jsonGetOptions(token))
      .then(api.checkStatus)
      .then(api.parseJson)
      .then(combineByDate);

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

const convertTo = {
  lbs(data) {
    return data.map((reading) => {
      const weight = +reading.weight * 2.20462262185;
      const trend = +reading.trend * 2.20462262185;
      return { ...reading, weight, trend };
    });
  },
  kg(data) {
    return data.map((reading) => {
      const weight = reading.weight * 0.45359237;
      const trend = reading.trend * 0.45359237;
      return { ...reading, weight, trend };
    });
  },
};

actions.toggleUnits = function toggleUnits() {
  return (dispatch, getState) => {
    const { humanapi } = getState();
    const unit = humanapi.unit === 'kg' ? 'lbs' : 'kg';
    const weightReadings = convertTo[unit](humanapi.weightReadings);
    return dispatch({
      type: types.HUMANAPI_TOGGLE_UNITS,
      data: { unit, weightReadings },
    });
  };
};

export default actions;
