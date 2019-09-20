const ValidationError = require("../../errors/validationError");
const transactions = new Map();
let lastKey = 0;

function getTransaction(transactionId) {
  if (!transactionId) {
    throw new ValidationError("No transactionId provided");
  }
  const transaction = transactions.get(transactionId);
  if (!transaction) {
    throw new ValidationError("No transaction found for provided transactionId");
  }
  return transaction;
}

function addTransaction(data) {
  if (!data.amount || !data.account) {
    throw new ValidationError(`No ${!data.amount ? "amount" : "account"} provided`);
  }
  const transactionId = getNextTransactionId();
  users.set(transactionId, { amount: data.amount, account: data.account, transactionId });
}

// this would be already handled in a "real" database
function getNextTransactionId() {
  return lastKey++;
}

module.exports = { getTransaction, addTransaction };
