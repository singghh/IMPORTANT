const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  it("should register user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Varun",
      email: "varun@test.com",
      password: "123456"
    });
    expect(res.statusCode).toBe(201);
  });
});
