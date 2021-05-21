const Users = require("../auth/users-model");

exports.checkUsernameFree = (req, res, next) => {
  Users.getBy({ username: req.body.username })
    .then((user) => {
      user.length === 0
        ? next()
        : next({ status: 400, message: "username taken" });
    })
    .catch(next);
};
exports.checkUsernameExists = (req, _res, next) => {
  Users.getBy({ username: req.body.username })
    .then((user) => {
      if (user.length !== 0) {
        req.foundUser = req.body;
        next();
      } else {
        next({ status: 400, message: "invalid credentials" });
      }
    })
    .catch(next);
};

exports.validateBody = (req, res, next) => {
  !req.body.username || !req.body.password
    ? next({ status: 400, message: "username and password required" })
    : next();
};

exports.validateAuth = (req, res, next) => {
  return next();
};
