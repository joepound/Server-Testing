const request = require("supertest");

const server = require("../../api/server");

describe("Hobbits routes:", () => {
  const testHobbits = [
    { name: "Alpha" },
    { name: "Bravo" },
    { name: "Charlie" }
  ];
  const expectedHobbits = [
    { id: 1, name: "Alpha" },
    { id: 2, name: "Bravo" },
    { id: 3, name: "Charlie" }
  ];

  afterEach(async () => {
    await db("hobbits").truncate();
  });

  describe(`Request to "GET /hobbits":`, () => {
    it("• should return a JSON", done => {
      request(server)
        .get("/hobbits")
        .then(res => {
          expect(res.type).toBe("application/json");
          done();
        });
    });

    it("• should return status 200", done => {
      request(server)
        .get("/hobbits")
        .then(res => {
          expect(res.status).toBe(200);
          done();
        });
    });

    it("• should retrieve all hobbits", done => {
      dbHelper.insert(testHobbits).then(() => {
        request(server)
          .get("/hobbits")
          .then(res => {
            expect(res).toBeEqual(expectedHobbits);
            done();
          });
      });
    });
  });

  describe(`Request to "GET /hobbits/:id":`, () => {
    it("• should return a JSON", done => {
      request(server)
        .get("/hobbits/1")
        .then(res => {
          expect(res.type).toBe("application/json");
          done();
        });
    });

    it("• should return status 200", done => {
      dbHelper.insert(testHobbits).then(() => {
        request(server)
          .get("/hobbits/2")
          .then(res => {
            expect(res.status).toBe(200);
            done();
          });
      });
    });

    it("• should retrieve a specific hobbit given an ID parameter", done => {
      dbHelper.insert(testHobbits).then(() => {
        request(server)
          .get("/hobbits/3")
          .then(res => {
            expect(res).toBe({ id: 3, name: "Charlie" });
            done();
          });
      });
    });
  });

  describe(`Request to "POST /hobbits"`, () => {

  })
});
