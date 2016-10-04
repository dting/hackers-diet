const fetch = require('node-fetch');

const controller = {};

controller.connect = function connect(req, res) {
  const sessionTokenObject = req.body;
  sessionTokenObject.clientSecret = process.env.HUMAN_API_SECRET;

  fetch('https://user.humanapi.co/v1/connect/tokens', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sessionTokenObject),
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
    .then(response => req
      .user.update(response, ['accessToken', 'humanId', 'publicToken']))
    .then(user => res.json(user))
    .catch(() => res.sendStatus(422));
};

controller.me = function me(req, res) {
  return res.json(req.user);
};

module.exports = controller;
