require("dotenv").config();

const supertest = require("supertest");
const should = require("should");
const knex = require("knex")(require("../../knexfile")["test"]);
const User = require("../../src/models/user");

const server = supertest.agent(`http://localhost:${process.env.PORT || 3000}`);

before(async () => {
  //set test database to empty/clean state
  if (process.env.NODE_ENV != "test") {
    throw new Error("Run tests via 'npm run test'");
  }
  await knex("users").truncate();
  await knex("accounts").truncate();
  await knex("transactions").truncate();
  await knex.migrate.latest();
});
describe("New Account endpoint", function() {
  it("should return error for negative customerId", function(done) {
    server
      .post("/accounts")
      .send({ customerId: -10 })
      .expect("Content-type", /json/)
      .expect(400)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        should.exist(res.error);
        res.status.should.equal(400);
        done();
      });
  });
  it("should return error for NaN customerId", function(done) {
    server
      .post("/accounts")
      .send({ customerId: "afs" })
      .expect("Content-type", /json/)
      .expect(400)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        should.exist(res.error);
        res.status.should.equal(400);
        done();
      });
  });
  it("should fail to open account for non existing user", function(done) {
    server
      .post("/accounts")
      .send({ customerId: 2 })
      .expect("Content-type", /json/)
      .expect(400)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        should.exist(res.error);
        res.status.should.equal(400);
        done();
      });
  });
  it("should open account for existing user", function(done) {
    new User({ name: "Niklas", surname: "Eicker" }).save().then((id) => {
      server
        .post("/accounts")
        .send({ customerId: id })
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          should.exist(res);
          should.exist(res.body.accountId);
          res.status.should.equal(200);
          done();
        });
    });
  });
});
