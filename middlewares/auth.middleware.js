const { FetchUserByUsername } = require('../repositories/user.repository');
const { InternalServerError, BadRequest } = require('../utils/http-response');
const {
  LoginValidation,
  RegisterValidation,
} = require('../validations/auth.validation');
const { Compare } = require('../utils/hash-password');

module.exports = {
  LoginMiddleware: async (req, res, next) => {
    try {
      const { error, value } = LoginValidation(req.body);

      if (error) {
        return BadRequest(res, error.details);
      }

      const user = await FetchUserByUsername(value.username);
      if (!user) return BadRequest(res, 'Username not registered');

      const isPasswordValid = await Compare(value.password, user.password);
      if (!isPasswordValid) return BadRequest(res, 'Password invalid');

      next();
    } catch (error) {
      return InternalServerError(res, error, 'Failed to login user');
    }
  },
  RegisterMiddleware: async (req, res, next) => {
    try {
      const { error, value } = RegisterValidation(req.body);

      if (error) {
        return BadRequest(res, error.details);
      }

      const user = await FetchUserByUsername(value.username);
      if (user) return BadRequest(res, 'Username already registered');

      next();
    } catch (error) {
      return InternalServerError(res, error, 'Failed to register user');
    }
  },
};
