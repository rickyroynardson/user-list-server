const { FetchUserById } = require('../repositories/user.repository');
const { InternalServerError, Ok } = require('../utils/http-response');
const { EncryptToken } = require('../utils/jwt');

module.exports = {
  RefreshToken: async (req, res) => {
    try {
      const user = await FetchUserById(req.body.id);
      const accessToken = await EncryptToken({ user }, 'access');

      const payload = {
        accessToken,
      };

      return Ok(res, payload, 'Success refresh token');
    } catch (error) {
      return InternalServerError(res, error, 'Failed to refresh token');
    }
  },
};
