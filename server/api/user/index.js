const { isAuthenticated } = require('../../auth/auth.service');
const controller = require('./user.controller');

const router = require('express').Router();

router.get('/me', isAuthenticated, controller.me);

module.exports = router;
