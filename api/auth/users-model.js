const db = require("../../data/dbConfig");

// todo: getAll, getById, update

const getBy = (userProp) => db("users").where(userProp);

const insert = async (user) => {
  const id = await db("users").insert(user);

  return getBy({ id: id[0] });
};

module.exports = {
  getBy,
  insert,
};
