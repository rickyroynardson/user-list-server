const { FetchUsers } = require('../repositories/user.repository');
const { InternalServerError, Ok } = require('../utils/http-response');

module.exports = {
  GetAllUsers: async (req, res) => {
    try {
      const users = await FetchUsers();

      const payload = {
        users,
      };

      return Ok(res, payload, 'Success fetch all users data');
    } catch (error) {
      return InternalServerError(res, error, 'Failed to fetch all users data');
    }
  },
};
