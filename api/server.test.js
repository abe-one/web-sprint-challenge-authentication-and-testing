const db = require("../data/dbConfig");
const request = require("supertest");
const server = require("./server");

const user1 = { username: "Captain Kuro", password: "foobar" };
const user2 = { ...user1, username: "Captain Django" };

const registerEp = "/api/auth/register";
const loginEp = "/api/auth/login";

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => await db("users").truncate());
afterAll(async () => await db.destroy());

describe("sanity", () => {
  test("is sane", () => expect(true).toBeTruthy());

  it("uses correct environment", () =>
    expect(process.env.NODE_ENV).toBe("testing"));
}); //sanity

describe("auth-router", () => {
  //
  describe(`[POST] ${registerEp}`, () => {
    describe("Happy path", () => {
      it("should respond with 201", async () => {
        const res = await request(server).post(registerEp).send(user1);
        expect(res.status).toBe(201);
      });

      it("should respond with new user", async () => {
        const res = await request(server).post(registerEp).send(user1);
        expect(res.body.username).toBe(user1.username);
      });

      it("should respond with user id", async () => {
        const res = await request(server).post(registerEp).send(user1);
        expect(res.body).toHaveProperty("id");
      });
      it("should respond with hashed password", async () => {
        const res = await request(server).post(registerEp).send(user1);
        expect(res.body.password).not.toEqual(user1.password);
      });
    }); //Happy path

    describe("Sad path: Bad inputs", () => {
      const { username, userNoName } = user1;

      describe("invalid username", () => {
        describe("duplicate username", () => {
          beforeEach(
            async () => await request(server).post(registerEp).send(user1)
          );
          it("should respond with 400 on duplicate username", async () => {
            const res = await request(server).post(registerEp).send(user1);
            expect(res.status).toBe(400);
          });

          it("should respond with proper error on duplicate username", async () => {
            const res = await request(server).post(registerEp).send(user1);
            expect(res.body.message).toEqual("username taken");
          });
        }); //duplicate username

        // it.todo(
        //   "should respond with 400 on missing username"
        //   //, async ()=>{

        //   //}
        // );
        // it.todo(
        //   "should respond with proper error on missing username"
        //   //, async ()=>{

        //   //}
        // );

        // it.todo(
        //   "should respond with 400 on invalid username"
        //   //, async ()=>{

        //   //}
        // );

        // it.todo(
        //   "should respond with proper error on invalid username"
        //   //, async ()=>{

        //}
        // );
      }); //invalid username

      //       describe("invalid password", () => {
      //         it.todo(
      //           "should respond with 400 on missing password"
      //           //, async ()=>{

      //           //}
      //         );
      //         it.todo(
      //           "should respond with proper error on missing password"
      //           //, async ()=>{

      //           //}
      //         );

      //         it.todo(
      //           "should respond with 400 on invalid password"
      //           //, async ()=>{

      //           //}
      //         );

      //         it.todo(
      //           "should respond with proper on invalid password"
      //           //, async ()=>{

      //           //}
      //         );
      //       }); //invalid password
    }); //Sad path STATUS 400
  }); //[POST] /registration

  describe(`[POST] ${loginEp}`, () => {
    describe("Happy path", () => {
      beforeEach(async () => {
        await request(server).post(registerEp).send(user1);
      });

      it("should respond with 200", async () => {
        const res = await request(server).post(loginEp).send(user1);
        expect(res.status).toBe(200);
      });

      it("should respond with message", async () => {
        const res = await request(server).post(loginEp).send(user1);
        expect(res.body.message).toBe(`welcome, ${user1.username}`);
      });

      // it("should respond with token containing username and id", async () => {
      //   const res = await request(server).post(loginEp).send(user1);
      //   expect(res.body).toHaveProperty("token");
      // });
    }); //Happy path
  }); //[POST] /login
}); //auth-router
