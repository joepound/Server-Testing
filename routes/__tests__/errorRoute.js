const request = require("supertest");

const server = require("../../api/server");

describe("Bad request:", () => {
  it("• should return status 400", () => {
    request(server)
      .get("/4/0/0")
      .then(res => expect(res.status).toBe(400));
  });

  it("• should return a JSON", done => {
    request(server)
      .get("/4/0/0")
      .then(res => {
        expect(res.type).toBe("application/json");
        done();
      });
  });

  it(`• should have "Bad route" as the contents of the returned JSON`, done => {
    request(server)
      .get("/4/0/0")
      .then(res => {
        expect(res.body).toEqual({ errorInfo: "Bad route." });
        done();
      });
  });
});
