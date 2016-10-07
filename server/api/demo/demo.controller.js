const { weightReadings } = require('../../components/humanapi/humanapi.service');

const controller = {};

controller.weight = function connect(req, res) {
  weightReadings(res);
};

module.exports = controller;
