const knex = require('knex')(require('../../knexfile'))
const ValidationError =  require('../errors/validationError')

class User {
  constructor(data) {
    this.name = data.name;
    this.surname = data.surname;
  }

  async save() {
    if(!this.name || !this.surname) {
      throw new ValidationError("Missing name or surname")
    }
    const res = await knex.insert({name: this.name, surname: this.surname}).into('users');
    return res[0]
  }

  static async getById(id) {
    if(isNaN(id) || id < 0) {
      throw new ValidationError("Invalid user ID")
    }
    const user = await knex("users").select().where("id", id).first();
    if(!user) {
      throw new ValidationError("User does not exist")
    }
    return user;
  }
}

module.exports = User;
