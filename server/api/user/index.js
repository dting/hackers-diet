const { isAuthenticated } = require('../../auth/auth.service');
const controller = require('./user.controller');
const weightRouter = require('./weight');

const router = require('express').Router();

router.get('/me', isAuthenticated, controller.me);
router.post('/connect', isAuthenticated, controller.connect);
router.use('/weight', isAuthenticated, weightRouter);

module.exports = router;
