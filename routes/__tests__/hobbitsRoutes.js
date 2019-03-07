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
      dbHelper
        .insert(testHobbits[0])
        .then(() => dbHelper.insert(testHobbits[1]))
        .then(() => dbHelper.insert(testHobbits[2]))
        .then(() => {
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
      dbHelper
        .insert(testHobbits[0])
        .then(() => dbHelper.insert(testHobbits[1]))
        .then(() => dbHelper.insert(testHobbits[2]))
        .then(() => {
          request(server)
            .get("/hobbits/1")
            .then(res => {
              expect(res.type).toBe("application/json");
              done();
            });
        });
    });

    it("• should return status 200", done => {
      dbHelper
        .insert(testHobbits[0])
        .then(() => dbHelper.insert(testHobbits[1]))
        .then(() => dbHelper.insert(testHobbits[2]))
        .then(() => {
          request(server)
            .get("/hobbits/2")
            .then(res => {
              expect(res.status).toBe(200);
              done();
            });
        });
    });

    it("• should retrieve a specific hobbit given an ID parameter", done => {
      dbHelper
        .insert(testHobbits[0])
        .then(() => dbHelper.insert(testHobbits[1]))
        .then(() => dbHelper.insert(testHobbits[2]))
        .then(() => {
          request(server)
            .get("/hobbits/3")
            .then(res => {
              expect(res).toBeEqual(expectedHobbits[2]);
              done();
            });
        });
    });
  });

  describe(`Request to "POST /hobbits"`, () => {
    it("• should return a JSON", done => {
      request(server)
        .post("/hobbits", testHobbits[0])
        .then(res => {
          expect(res.type).toBe("application/json");
          done();
        });
    });

    it("• should return status 201", done => {
      request(server)
        .post("/hobbits", testHobbits[0])
        .then(res => {
          expect(res.status).toBe(201);
          done();
        });
    });

    it("• should return the inserted hobbit", done => {
      request(server)
        .post("/hobbits", testHobbits[0])
        .then(res => {
          expect(res).toBeEqual(expectedHobbits[0]);
          done();
        });
    });

    it("• should actually insert the new hobbit into the database", done => {
      request(server)
        .post("/hobbits", testHobbits[0])
        .then(() => {
          dbHelper.get(1).then(res => {
            expect(res).toBeEqual(expectedHobbits[0]);
            done();
          });
        });
    });
  });

  describe(`Request to "DELETE /hobbits/:id"`, () => {
    it("• should return a JSON", done => {
      dbHelper.insert(testHobbits[0]).then(() => {
        request(server)
          .delete("/hobbits/1")
          .then(res => {
            expect(res.type).toBeEqual(expectedHobbits[0]);
            done();
          });
      });
    });

    it("• should return status 200", done => {
      dbHelper.insert(testHobbits[0]).then(() => {
        request(server)
          .delete("/hobbits/1")
          .then(res => {
            expect(res.status).toBe(200);
            done();
          });
      });
    });

    it("• should return the deleted hobbit", done => {
      dbHelper.insert(testHobbits[0]).then(() => {
        request(server)
          .delete("/hobbits/1")
          .then(res => {
            expect(res).toBe(expectedHobbits[0]);
            done();
          });
      });
    });

    it("• should actually delete the specified hobbit from the database", done => {
      dbHelper
        .insert(testHobbits[0])
        .then(() => dbHelper.insert(testHobbits[1]))
        .then(() => dbHelper.insert(testHobbits[2]))
        .then(() => {
          request(server)
            .delete("/hobbits/2")
            .then(() => {
              dbHelper.get().then(res => {
                expect(res.length).toBeEqual([
                  expectedHobbits[0],
                  expectedHobbits[2]
                ]);
                done();
              });
            });
        });
    });
  });
});
