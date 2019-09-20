const express = require('express');
const router = express.Router();
const { addAccount } = require('../database')

router.post('/accounts', (req, res, next) => {
  const account = addAccount({amount: req.body.amount, customerId: req.body.customerId})
  res.result = account;
})

module.exports = router;