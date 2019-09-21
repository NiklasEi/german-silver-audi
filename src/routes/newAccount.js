const express = require("express");
const router = express.Router();
const logger = require("../logger");
const ValidationError = require("../errors/validationError");
const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

router.post("/accounts", async (req, res, next) => {
  data = {
    customerId: req.body.customerId,
    amount: isNaN(Number(req.body.amount)) ? 0 : Number(req.body.amount)
  };
  try {
    // fail and return error if an amount was given, but is not a number
    if(req.body.amount && isNaN(Number(req.body.amount))) {
      throw new ValidationError("Invalid amount given")
    }
    // for now only allow positive transactions to the account
    if (data.amount < 0) {
      throw new ValidationError(
        "You cannot open an account with a negative balance"
      );
    }
    // verify that the user with the given customerId exists
    const user = await User.getById(data.customerId);
    const accountId = await new Account(data.customerId).save();
    if (data.amount > 0) {
      await new Transaction({
        accountId: accountId,
        amount: data.amount
      }).save();
    }
    res.result = { accountId };
    next();
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

module.exports = router;
