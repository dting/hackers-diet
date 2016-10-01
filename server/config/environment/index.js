const _ = require('lodash');
const path = require('path');

const baseSettings = {
  env: process.env.NODE_ENV || 'development',
  root: path.normalize(`${__dirname}/../../..`),
  port: process.env.PORT || 9000,
  ip: process.env.IP || '0.0.0.0',
  secrets: {
    session: process.env.APP_SECRET || 'seq-secret',
  },
  google: {
    clientID: process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/google/callback`,
  },
};

const environmentSettings = require(`./${baseSettings.env}`);

module.exports = _.merge(baseSettings, environmentSettings || {});
