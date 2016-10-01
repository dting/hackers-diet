const config = require('../config/environment');
const db = require('../db');

require('./google/passport').setup(db.User, config);

const router = require('express').Router();
router.use('/google', require('./google'));

module.exports = router;
