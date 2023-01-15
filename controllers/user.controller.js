const {
  FetchUsers,
  StoreUser,
  DestroyUser,
  FetchUserById,
  UpdateUser,
} = require('../repositories/user.repository');
const { InternalServerError, Ok } = require('../utils/http-response');
const { Encrypt } = require('../utils/hash-password');

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
  CreateUser: async (req, res) => {
    try {
      const payload = {
        ...req.body,
        password: await Encrypt(req.body.password),
      };

      const result = await StoreUser(payload);

      return Ok(res, result, 'User created successfully');
    } catch (error) {
      return InternalServerError(res, error, 'Failed to store user data');
    }
  },
  UpdateUser: async (req, res) => {
    try {
      const user = await UpdateUser(req.params.id, req.body);

      const payload = {
        user,
      };

      return Ok(res, payload, 'User updated successfully');
    } catch (error) {
      return InternalServerError(res, error, 'Failed to update user data');
    }
  },
  DeleteUser: async (req, res) => {
    try {
      const user = await DestroyUser(req.params.id);

      const payload = {
        user,
      };

      return Ok(res, payload, 'User deleted successfully');
    } catch (error) {
      return InternalServerError(res, error, 'Failed to delete user data');
    }
  },
};
