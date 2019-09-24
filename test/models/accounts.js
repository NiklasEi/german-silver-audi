require("dotenv").config();

const knex = require("knex")(require("../../knexfile")["test"]);
const should = require("should");
const Account = require("../../src/models/account");
const User = require("../../src/models/user");

describe("Account model", function() {
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
    knex("accounts")
      .select()
      .then(accounts => {
        should.exist(accounts);
        accounts.length.should.equal(0);
        done();
      })
      .catch(error => done(error));
  });
  it("should add new accounts", async function() {
    await new Account(1).save();
    await new Account(1).save();
    return knex("accounts")
      .select("id", "customerId")
      .then(accounts => {
        should.exist(accounts);
        accounts.should.deepEqual([
          { id: 1, customerId: 1 },
          { id: 2, customerId: 1 }
        ]);
      });
  });
  it("should get account by id", function(done) {
    new Account(1)
      .save()
      .then(id => {
        Account.getById(id)
          .then(account => {
            should.exist(account);
            should.equal(account.id, id);
            should.equal(account.customerId, 1);
            done();
          })
          .catch(error => {
            done(error);
          });
      })
      .catch(error => {
        done(error);
      });
  });
  it("should get accounts by user Id", async function() {
    await new User({ name: "Niklas", surname: "Eicker" }).save();
    await new Account(1).save();
    await new Account(1).save();
    return Account.getCustomerAccounts(1)
      .then(accounts => {
        should.exist(accounts);
        should.equal(accounts.length, 2);
        should.equal(accounts.find(elem => elem.id === 1).customerId, 1);
        should.equal(accounts.find(elem => elem.id === 2).customerId, 1);
      })
      .catch(error => {
        done(error);
      });
  });
});
