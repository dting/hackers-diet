const controller = require('./weight.controller');

const { hasDataType } = require('../../../components/humanapi/humanapi.service');

const router = require('express').Router();

router.get('/', hasDataType('weight'), controller.list);

module.exports = router;
