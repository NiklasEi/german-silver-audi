const knex = require('knex')(require('../../knexfile'))
const ValidationError =  require('../errors/validationError')

class Transaction {
  constructor(data) {
    this.accountId = data.accountId;
    this.amount = data.amount;
  }

  async save() {
    if(isNaN(this.accountId) || this.accountId < 0) {
      throw new ValidationError("Invalid account ID")
    }
    if(isNaN(this.amount)) {
      throw new ValidationError("Invalid amount")
    }
    const res = await knex.insert({accountId: this.accountId, amount: this.amount}).into('transactions');
    return res[0]
  }

  static async getById(id) {
    if(isNaN(id) || id < 0) {
      throw new ValidationError("Invalid transaction ID")
    }
    const transaction = await knex("transactions").select().where("id", id).first();
    if(!transaction) {
      throw new ValidationError("Transaction does not exist")
    }
    return transaction;
  }

  static async getAccountTransactions(accountId) {
    if(isNaN(accountId) || accountId < 0) {
      throw new ValidationError("Invalid account ID")
    }
    const transactions = await knex("transactions").select().where("accountId", accountId);
    return transactions;
  }
}

module.exports = Transaction;
