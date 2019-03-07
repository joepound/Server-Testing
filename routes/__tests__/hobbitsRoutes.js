const request = require("supertest");

const server = require("../../api/server");

describe("Hobbits routes:", () => {
  const testHobbits = [
    { name: "Alpha" },
    { name: "Bravo" },
  ];
  const expectedHobbits = [
    { id: 1, name: "Alpha" },
    { id: 2, name: "Bravo" },
  ];

  afterEach(async () => {
    await db("hobbits").truncate();
  });

  describe(`Request to "GET /hobbits":`, () => {
    it("• should return status 200", done => {
      request(server)
        .get("/hobbits")
        .then(res => {
          expect(res.status).toBe(200);
          done();
        });
    });

    it("• should retrieve all hobbits", done => {
      dbHelper
        .insert(testHobbits)
        .then(() => {
          request(server)
            .get("/hobbits")
            .then(res => {
              expect(res).toBeEqual(expectedHobbits);
              done();
            })
        });
    });
  });
});
