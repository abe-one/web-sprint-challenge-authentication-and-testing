const Users = require("../auth/users-model");

exports.checkUsernameExists = (req, res, next) => {
  const username = req.body.username;
  Users.getBy({ username: username })
    .then((user) => {
      if (user.length === 0) {
        next();
      } else {
        req.user = user;
        next();
      }
    })
    .catch(next);
};

exports.validateAuth = (req, res, next) => {
  return next();
};
