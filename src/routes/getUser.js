const express = require("express");
const router = express.Router();
const logger = require("../logger");
const httpContext = require("express-http-context");
const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

router.get("/user/:id", async (req, res, next) => {
  logger.info("GET /user/%s", req.params.id, {
    reqId: httpContext.get("reqId")
  });
  try {
    let user = await User.getById(req.params.id);
    // populate accounts and transactions
    let accounts = await Account.getCustomerAccounts(user.id);
    let transactions = await Promise.all(
      accounts.map(account => Transaction.getAccountTransactions(account.id))
    );
    accounts.forEach((account, index) => {
      account.balance = transactions[index].reduce(
        (sum, current) => sum + current.amount,
        0
      );
      account.transactions = transactions[index];
    });
    user.accounts = accounts;
    res.result = user;
    next();
  } catch (error) {
    logger.error(error, { reqId: httpContext.get("reqId") });
    next(error);
  }
});

module.exports = router;
