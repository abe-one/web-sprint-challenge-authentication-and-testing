const router = require("express").Router();
const {
  checkUsernameFree,
  validateBody,
  checkUsernameExists,
} = require("../middleware/auth-middleware");
const Users = require("./users-model");

const bcrypt = require("bcrypt");
const buildToken = require("./build-token");
const { BCRYPT_ROUNDS: rounds } = require("../../env-variables");

router.post("/register", validateBody, checkUsernameFree, (req, res, next) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  Users.insert(user)
    .then((newUser) => res.status(201).json(newUser))
    .catch(next);
});

router.post(
  "/login",
  validateBody,
  checkUsernameExists,
  validateBody,
  (req, res, next) => {
    let { username, password } = req.body;
    const { password: hash } = req.foundUser;

    if (bcrypt.compareSync(password, hash)) {
      const token = buildToken(req.foundUser);
      res.status(200).json({ message: `welcome, ${username}`, token: token });
    } else {
      next({ status: 400, message: "invalid credentials" });
    }
  }
);

module.exports = router;
