const db = require("../data/dbConfig");
const request = require("supertest");
const server = require("./server");

const user1 = { username: "Captain Kuro", password: "foobar" };
const user2 = { ...user1, username: "Captain Django" };
const user1Copy = { ...user1 };

describe("sanity", () => {
  test("is sane", () => expect(true).toBeTruthy());

  it("uses correct environment", () =>
    expect(process.env.NODE_ENV).toBe("testing"));
}); //sanity

describe("auth-router", () => {
  const registerEp = "/api/auth/register";
  describe(`[POST] ${registerEp}`, () => {
    describe("Happy path", () => {
      it("should respond with 201", async () => {
        const res = await request(server).post(registerEp).send(user1);
        expect(res.status).toBe(201);
      });

      it("should respond with new user", async () => {
        const res = await request(server).post(registerEp).send(user1);
        expect(res.body).toMatchObject(user1);
      });

      it("should respond with user id", async () => {
        const res = await request(server).post(registerEp).send(user1);
        expect(res.body).toHaveProperty("id");
      });
    }); //Happy path

    //     describe("Sad path: Bad inputs", () => {
    //       const { username, userNoName } = user1;

    //       describe("invalid username", () => {
    //         // it("should respond with 400 on duplicate username", async () => {
    //         //   await request(server).post(registerEp).send(user1Copy);
    //         //   const res = await request(server).post(registerEp).send(user1Copy);
    //         //   expect(res.status).toBe(400);
    //         // });

    //         it.todo(
    //           "should respond with proper error on duplicate username"
    //           // , async () => {

    //           // }
    //         );
    //         //duplicate username

    //         it.todo(
    //           "should respond with 400 on missing username"
    //           //, async ()=>{

    //           //}
    //         );
    //         it.todo(
    //           "should respond with proper error on missing username"
    //           //, async ()=>{

    //           //}
    //         );

    //         it.todo(
    //           "should respond with 400 on invalid username"
    //           //, async ()=>{

    //           //}
    //         );

    //         it.todo(
    //           "should respond with proper on invalid username"
    //           //, async ()=>{

    //           //}
    //         );
    //       }); //invalid username

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
    //     }); //Sad path STATUS 400
  }); //[POST] /registration
}); //auth-router
