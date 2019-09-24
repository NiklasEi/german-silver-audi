require("dotenv").config();

const knex = require("knex")(require("../../knexfile")["test"]);
const should = require("should");
const Transaction = require("../../src/models/transaction");

describe("Transaction model", function() {
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
    knex("transactions")
      .select()
      .then(transactions => {
        should.exist(transactions);
        transactions.length.should.equal(0);
        done();
      })
      .catch(error => done(error));
  });
  it("should add new transactions", async function() {
    await new Transaction({ accountId: 1, amount: 5 }).save();
    await new Transaction({ accountId: 1, amount: 3 }).save();
    return knex("transactions")
      .select("id", "accountId", "amount")
      .then(transactions => {
        should.exist(transactions);
        transactions.should.deepEqual([
          { id: 1, accountId: 1, amount: 5 },
          { id: 2, accountId: 1, amount: 3 }
        ]);
      });
  });
  it("should get transaction by id", async function() {
    await new Transaction({ accountId: 2, amount: 5 }).save();
    return Transaction.getById(1).then(transaction => {
      should.exist(transaction);
      transaction.id.should.equal(1);
      transaction.accountId.should.equal(2);
      transaction.amount.should.equal(5);
    });
  });
});
