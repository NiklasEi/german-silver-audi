const express = require("express");
const router = express.Router();
const { getUser, getAccount, getTransaction } = require("../database");

router.get("/user/:id", (req, res, next) => {
  let user = getUser(req.params.id)
  // populate accounts and transactions
  accounts = []
  for (let accountId in user.accounts) {
    let account = getAccount(accountId)
    let transactions = []
    for (let transactionId in account.transactions) {
      transactions.push(getTransaction(transactionId))
    }
    account.transactions = transactions
    accounts.push(account)
  }
  user.accounts = accounts;
  res.status(200).json(user)
});

module.exports = router;
