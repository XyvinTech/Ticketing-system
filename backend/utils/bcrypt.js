const bcrypt = require("bcrypt");

module.exports.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10);
};

module.exports.comparePasswords = async function(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};
