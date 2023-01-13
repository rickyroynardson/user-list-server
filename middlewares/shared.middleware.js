const { FetchUserById } = require('../repositories/user.repository');
const { Unauthorized } = require('../utils/http-response');
const { DecryptToken } = require('../utils/jwt');

module.exports = {
  AuthToken: async (req, res, next) => {
    const BearerToken = req.headers.authorization;
    if (!BearerToken) return Unauthorized(res, {});

    const token = BearerToken.split(' ')[1];

    try {
      const decode = DecryptToken(token, 'access');
      const user = await FetchUserById(decode.user._id);
      if (!user) return Unauthorized(res, {});

      req.user = user;
      next();
    } catch (error) {
      return Unauthorized(res, {});
    }
  },
};
