const ValidationError = require("../../errors/validationError");
const users = new Map();
let lastKey = 0;

function getUser(customerId) {
  if (!customerId) {
    throw new ValidationError("No customerId provided");
  }
  const user = users.get(customerId);
  if (!user) {
    throw new ValidationError("No user found for provided customerId");
  }
  return user;
}

function addUser(data) {
  if (!data.name || !data.surname) {
    throw new ValidationError(`No ${!data.name ? "name" : "surname"} provided`);
  }
  const customerId = getNextCustomerId();
  users.set(customerId.toString(), { name: data.name, surname: data.surname, customerId });
}

// this would be already handled in a "real" database
function getNextCustomerId() {
  return lastKey++;
}

module.exports = { getUser, addUser };
