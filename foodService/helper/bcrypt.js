const bcrypt = require("bcrypt");
const salt = 3;

function hashPassword(plainPassword) {
  const hashed = bcrypt.hashSync(plainPassword, salt);
  return hashed;
}

module.exports = { hashPassword };
