const {
  FetchUserByUsername,
  StoreUser,
} = require('../repositories/user.repository');
const { EncryptToken } = require('../utils/jwt');
const { InternalServerError, Ok } = require('../utils/http-response');

module.exports = {
  Login: async (req, res) => {
    try {
      const user = await FetchUserByUsername(req.body.username);
      const accessToken = await EncryptToken({ user }, 'access');
      const refreshToken = await EncryptToken({ user }, 'refresh');

      const payload = {
        user,
        accessToken,
        refreshToken,
      };

      return Ok(res, payload, 'User logged in successfully');
    } catch (error) {
      return InternalServerError(res, error, 'Failed to login user');
    }
  },
  Register: async (req, res) => {
    try {
      const payload = {
        ...req.body,
        password: await Encrypt(req.body.password),
      };

      const result = await StoreUser(payload);

      return Ok(res, result, 'User registered successfully');
    } catch (error) {
      return InternalServerError(res, error, 'Failed to register user');
    }
  },
};
