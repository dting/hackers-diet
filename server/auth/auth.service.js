const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const config = require('../config/environment');
const { User } = require('../db');

const validateJwt = expressJwt({ secret: config.secrets.session });

const accessTokenHeader = function accessTokenHeader(req, res, next) {
  const { query, headers } = req;
  if (query && {}.hasOwnProperty.call(query, 'access_token')) {
    headers.authorization = `Bearer ${query.access_token}`;
  }
  next();
};

const populateUser = function populateUser(req, res, next) {
  return User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(401).end();
      }
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(err => next(err));
};

exports.isAuthenticated = [accessTokenHeader, validateJwt, populateUser];
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */

/**
 * Returns a jwt token signed by the app secret
 */
exports.signToken = function signToken(id, role) {
  return jwt.sign({ _id: id, role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5,
  });
};

/**
 * Set token cookie directly for oAuth strategies
 */
exports.setTokenCookie = function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  const token = exports.signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  return res.redirect('/');
};
