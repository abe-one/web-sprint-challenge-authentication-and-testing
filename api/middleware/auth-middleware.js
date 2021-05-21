const Users = require("../auth/users-model");

exports.checkUsernameFree = (req, res, next) => {
  const username = req.body.username;
  Users.getBy({ username: username })
    .then((user) => {
      user.length === 0
        ? next()
        : next({ status: 400, message: "username taken" });
    })
    .catch(next);
};

exports.validateAuth = (req, res, next) => {
  return next();
};
