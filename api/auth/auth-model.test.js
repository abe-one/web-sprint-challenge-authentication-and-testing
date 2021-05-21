const Users = require("./users-model");
const db = require("../../data/dbConfig");

const user1 = { username: "CaptainKuro", password: "foobar" };
const user2 = { ...user1, username: "Captain Django" };
const user1Copy = { ...user1 };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => await db("users").truncate());
afterAll(async () => await db.destroy());

describe("Users-model", () => {
  describe("getBy", () => {
    beforeEach(async () => await db("users").insert(user1));

    it("should resolve to user", async () => {
      const resolvedUser = await Users.getBy(user1.username);
      expect(resolvedUser).toMatchObject(user1);
    });
  }); //getBy
}); //Users-model
