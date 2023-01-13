const jwt = require('jsonwebtoken');

module.exports = {
  EncryptToken: (payload, type) => {
    return jwt.sign(
      payload,
      type == 'access'
        ? process.env.JWT_ACCESS_SECRET
        : process.env.JWT_REFRESH_SECRET,
      {
        expiresIn:
          type == 'access'
            ? process.env.JWT_ACCESS_EXPIRES_IN
            : process.env.JWT_REFRESH_EXPIRES_IN,
      }
    );
  },
  DecryptToken: (token, type) => {
    return jwt.verify(
      token,
      type == 'access'
        ? process.env.JWT_ACCESS_SECRET
        : process.env.JWT_REFRESH_SECRET
    );
  },
};
