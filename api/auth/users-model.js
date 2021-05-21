const db = require("../../data/dbConfig");

// todo: getAll, getById, update

exports.getBy = (userProp) => db("users").where(userProp);

exports.insert = async (user) => {
  return null;
};
