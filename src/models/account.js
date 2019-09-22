const knex = require('knex')(require('../../knexfile'))
const ValidationError =  require('../errors/validationError')

class Account {
  constructor(customerId) {
    this.customerId = customerId;
  }

  async save() {
    if(isNaN(this.customerId) || this.customerId < 0) {
      throw new ValidationError("Invalid customer ID")
    }
    const res = await knex.insert({customerId: this.customerId}).into('accounts');
    return res[0]
  }

  static async getById(id) {
    if(isNaN(id) || id < 0) {
      throw new ValidationError("Invalid account ID")
    }
    const account = await knex("accounts").select().where("id", id).first();
    if(!account) {
      throw new ValidationError("Account does not exist")
    }
    return account;
  }

  static async getCustomerAccounts(customerId) {
    if(isNaN(customerId) || customerId < 0) {
      throw new ValidationError("Invalid customer ID")
    }
    const accounts = await knex("accounts").select().where("customerId", customerId);
    return accounts;
  }
}

module.exports = Account;
