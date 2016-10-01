const express = require('express');
const logger = require('winston');

const config = require('./config');
const db = require('./db');

const app = express();

config(app);

db.sequelize.sync()
  .then(() => logger.info('Database synced...'))
  .then(() => app.listen(app.get('port'), app.get('ip')))
  .then(() => logger.info(`Listening on port ${app.get('port')} in ${app.get('env')} mode...`))
  .catch(logger.error);
