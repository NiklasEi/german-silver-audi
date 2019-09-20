const { getUser, addUser } = require("./memory/user-data");
const { addAccount, getAccount } = require("./memory/account-data");
const { addTransaction, getTransaction } = require("./memory/transaction-data");

module.exports = {
  getUser,
  addUser,
  addAccount,
  getAccount,
  getTransaction,
  addTransaction
};
