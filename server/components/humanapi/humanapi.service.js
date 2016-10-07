const fetch = require('node-fetch');

const humanapi = {};

humanapi.hasDataType = function hasDataType(dataType) {
  return (req, res, next) => {
    const { accessToken } = req.user;
    fetch('https://api.humanapi.co/v1/human/sources', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      })
      .then(response => response.json())
      .then((response) => {
        if (response.some(source => source.supportedDataTypes.indexOf(dataType))) {
          return next();
        }
        return res.json([]);
      })
      .catch(err => next(err));
  };
};

humanapi.weightReadings = function weightReadings(res, token = 'demo') {
  fetch('https://api.humanapi.co/v1/human/weight/readings', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(response => res.json(response))
    .catch(err => res.status(500).send(err));
};

module.exports = humanapi;
