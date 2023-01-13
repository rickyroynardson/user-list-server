const argon2 = require('argon2');

module.exports = {
  Encrypt: async (password) => {
    return await argon2.hash(password);
  },
  Compare: async (password, hash) => {
    return await argon2.verify(hash, password);
  },
};
