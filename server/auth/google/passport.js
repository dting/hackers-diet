const passport = require('passport');

const { Strategy } = require('passport-google-oauth20');

module.exports.setup = function setup(User, config) {
  passport.use(new Strategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
  }, (accessToken, refreshToken, profile, done) => {
    User.find({ where: { 'google.id': profile.id } })
      .then((user) => {
        if (user) {
          return done(null, user);
        }

        const newUser = User.build({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.emails[0].value.split('@')[0],
          provider: 'google',
          google: profile._json,
        });
        return newUser.save()
          .then(savedUser => done(null, savedUser))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
};
