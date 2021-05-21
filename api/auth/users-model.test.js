const Users = require("./users-model");
const db = require("../../data/dbConfig");

const user1 = { username: "Captain Kuro", password: "foobar" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => await db("users").truncate());
afterAll(async () => await db.destroy());

describe("Users-model", () => {
  describe("getBy()", () => {
    const username = user1.username;

    beforeEach(async () => await db("users").insert(user1));

    it("should resolve to user", async () => {
      const resolvedUser = await Users.getBy({ username: username });
      expect(resolvedUser[0]).toMatchObject(user1);
    });

    it("should resolve to user with id", async () => {
      const resolvedUser = await Users.getBy({ username: username });
      expect(resolvedUser[0]).toHaveProperty("id");
    });
  }); //getBy()

  describe("insert()", () => {
    it("should resolve to new user", async () => {
      const resolvedUser = await Users.insert(user1);
      expect(resolvedUser).toMatchObject(user1);
    });
    it("should resolve to new user with id", async () => {
      const resolvedUser = await Users.insert(user1);
      expect(resolvedUser).toHaveProperty("id");
    });
    it("should add new user to db", async () => {
      const resolvedUser = await Users.insert(user1);
      const insertedUser = await db("users")
        .where({ id: resolvedUser.id })
        .first();

      expect(insertedUser).toEqual(resolvedUser);
    });
  }); //insert()
}); //Users-model
