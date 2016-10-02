const Sequelize = require('sequelize');

const config = require('../config/environment');

const db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options),
};

db.User = db.sequelize.import('../api/user/user.model');

module.exports = db;
