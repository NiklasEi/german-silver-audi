const ValidationError = require("../../errors/validationError");
const accounts = new Map();
let lastKey = 0;

function getAccount(accountId) {
  if (!accountId) {
    throw new ValidationError("No accountId provided");
  }
  const account = accounts.get(accountId);
  if (!account) {
    throw new ValidationError("No account found for provided accountId");
  }
  return account;
}

function addAccount(data) {
  if (!data.amount || !data.customerId) {
    throw new ValidationError(`No ${!data.amount ? "amount" : "customerId"} provided`);
  }
  const accountId = getNextAccountId();
  const account = { amount: data.amount, customerId: data.customerId, accountId }
  accounts.set(accountId, account);
  return account
}

// this would be already handled in a "real" database
function getNextAccountId() {
  return lastKey++;
}

module.exports = { getAccount, addAccount };
