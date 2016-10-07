const { weightReadings } = require('../../../components/humanapi/humanapi.service');

const controller = {};

controller.list = function list(req, res) {
  const { accessToken } = req.user;
  weightReadings(res, accessToken);
};

module.exports = controller;
