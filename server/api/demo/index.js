const controller = require('./demo.controller');

const router = require('express').Router();

router.get('/weight', controller.weight);

module.exports = router;
