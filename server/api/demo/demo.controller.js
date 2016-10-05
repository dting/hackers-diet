const fetch = require('node-fetch');

const controller = {};

controller.weight = function connect(req, res) {
  fetch('https://api.humanapi.co/v1/human/weight/readings?access_token=demo', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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

module.exports = controller;
