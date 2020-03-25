const bcrypt = require("bcrypt");
const salt = 3;

function hashPassword(plainPassword) {
  const hashed = bcrypt.hashSync(plainPassword, salt);
  return hashed;
}

function comparePassword(plainPassword,hashedPassword) {
  console.log(plainPassword,hashedPassword)
  const compared = bcrypt.compareSync(plainPassword, hashedPassword);
  console.log(compared)
  return compared;
}

module.exports = { hashPassword,comparePassword };
