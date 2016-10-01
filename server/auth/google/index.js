const passport = require('passport');

const authService = require('../auth.service');

const router = require('express').Router();

router
  .get('/', passport.authenticate('google', {
    failureRedirect: '/signup',
    scope: [
      'profile',
      'email',
    ],
    session: false,
  }))
  .get('/callback', passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false,
  }), authService.setTokenCookie);

module.exports = router;
