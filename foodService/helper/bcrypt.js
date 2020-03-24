const bcrypt = require("bcrypt");
const salt = 3;

function hashPassword(plainPassword) {
  const hashed = bcrypt.hashSync(plainPassword, salt);
  return hashed;
}

function comparePassword(plainPassword,hashedPassword) {
  const compared = bcrypt.compareSync(plainPassword, hashedPassword);
  return compared;
}

module.exports = { hashPassword,comparePassword };
