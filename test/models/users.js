require("dotenv").config();

const knex = require("knex")(require("../../knexfile")["test"]);
const should = require("should");
const User = require("../../src/models/user");

describe("User model", function() {
  beforeEach(async () => {
    //set test database to empty/clean state
    if (process.env.NODE_ENV != "test") {
      throw new Error("Run tests via 'npm run test'");
    }
    await knex.migrate.latest();
    await knex("users").truncate();
    await knex("accounts").truncate();
    await knex("transactions").truncate();
  });
  it("should be empty before adding entries", function(done) {
    knex("users")
      .select()
      .then(users => {
        should.exist(users);
        users.length.should.equal(0);
        done();
      })
      .catch(error => done(error));
  });
  it("should add new users", async function() {
    await new User({ name: "Niklas", surname: "Eicker" }).save();
    await new User({ name: "Jon", surname: "Doe" }).save();
    await new User({ name: "Jane", surname: "Doe" }).save();
    return knex("users")
      .select("id", "name", "surname")
      .then(users => {
        should.exist(users);
        users.should.deepEqual([
          { id: 1, name: "Niklas", surname: "Eicker" },
          { id: 2, name: "Jon", surname: "Doe" },
          { id: 3, name: "Jane", surname: "Doe" }
        ]);
      });
  });
  it("should get user by id", async function() {
    await new User({ name: "Niklas", surname: "Eicker" }).save();
    return User.getById(1).then(user => {
      should.exist(user);
      user.id.should.equal(1);
      user.name.should.equal("Niklas");
      user.surname.should.equal("Eicker");
    });
  });
});
