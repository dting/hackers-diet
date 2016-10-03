const { User } = require('../../db');

const controller = {};

controller.me = function me(req, res, next) {
  return User.find({ where: { _id: req.user._id } })
    .then((user) => {
      if (!user) {
        return res.status(401).end();
      }
      return res.json(user);
    })
    .catch(err => next(err));
};

module.exports = controller;
