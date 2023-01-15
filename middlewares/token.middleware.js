const { FetchUserById } = require('../repositories/user.repository');
const { Unauthorized } = require('../utils/http-response');
const { DecryptToken } = require('../utils/jwt');

module.exports = {
  VerifyRefreshToken: async (req, res, next) => {
    const BearerToken = req.headers.authorization;
    if (!BearerToken) return Unauthorized(res, {});

    const token = BearerToken.split(' ')[1];

    try {
      const decode = DecryptToken(token, 'refresh');
      if (decode.user._id !== req.body.id) return Unauthorized(res, {});

      next();
    } catch (error) {
      return Unauthorized(res, {});
    }
  },
};
