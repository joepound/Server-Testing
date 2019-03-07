const request = require("supertest");

const server = require("../api/server");

describe(`Request to "GET /":`, () => {
  it("• should return status 200", done => {
    request(server)
      .get("/")
      .then(res => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it("• should return a JSON", done => {
    request(server)
      .get("/")
      .then(res => {
        expect(res.type).toBe("application/json");
        done();
      })
  });

  it("• should have app name as the contents of the returned JSON", done => {
    request(server)
      .get("/")
      .then(res => {
        expect(res.body).toEqual({
          app: "Hobbits API"
        });
        done();
      });
  });
});
