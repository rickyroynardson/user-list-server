const {
  FetchUserByUsername,
  FetchUserById,
} = require('../repositories/user.repository');
const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require('../utils/http-response');
const { CreateValidation } = require('../validations/user.validation');

module.exports = {
  CreateUserMiddleware: async (req, res, next) => {
    try {
      const { error, value } = CreateValidation(req.body);

      if (error) {
        return BadRequest(res, error.details);
      }

      const user = await FetchUserByUsername(value.username);
      if (user) return BadRequest(res, 'Username already registered');

      next();
    } catch (error) {
      return InternalServerError(res, error, 'Failed to create user');
    }
  },
  DeleteUserMiddleware: async (req, res, next) => {
    try {
      if (!req.params.id) return BadRequest(res, 'No user id provided');

      const user = await FetchUserById(req.params.id);
      if (!user) return NotFound(res, 'No user found to delete');

      next();
    } catch (error) {
      return InternalServerError(res, error, 'Failed to delete user');
    }
  },
};
