process.env.NODE_ENV = "test";
const expect = requre("chai").expect;
const request = require("supertest");

const app = require("../../server");
const testDb = require("../../config/db_test");

//Test for POST /companies

describe("POST request to /companies route", () => {
  before((done) => {
    testDb
      .connect()
      .then(() => done())
      .catch((e) => done(e));
  });

  after((done) => {
    testDb
      .close()
      .then(() => done())
      .catch((e) => done(e));
  });

  it("Should create a new company", (done) => {
    request(app)
      .post("/api/v1/companies")
      .send({
        'name': "Amazon",
        'domain': "E-Commerce",
        'createdAt': "2001-09-06",
        'photo': "no-photo.jpg",
      })
      .then((response) => {
        const body = response.body;
        expect(response.status).to.eql(201);
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("data");
        expect(body.data).to.contain.property("_id");
        done();
      })
      .catch((e) => done(e));
  });
});
