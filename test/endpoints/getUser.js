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
describe("Get user endpoint", function() {
  it("should return error for invalid clientId", function(done) {
    server
      .get("/user/gfd")
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
  it("should return 404 for not existing user", function(done) {
    server
      .get("/user/4")
      .expect("Content-type", /json/)
      .expect(400)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.error.message);
        res.status.should.equal(400);
        done();
      });
  });
  it("should return user info for existing user", function(done) {
    new User({ name: "Niklas", surname: "Eicker" }).save().then(() => {
      server
        .get("/user/1")
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          res.error.should.equal(false);
          res.status.should.equal(200);
          should.equal(res.body.name, "Niklas");
          should.equal(res.body.surname, "Eicker");
          should.exist(res.body.accounts);
          done();
        });
    });
  });
});
