const User = require('../models/user.model');

module.exports = {
  FetchUsers: async () => {
    return await User.find();
  },
  FetchUserById: async (id) => {
    return await User.findById(id);
  },
  FetchUserByUsername: async (username) => {
    return await User.findOne({ username });
  },
  StoreUser: async (payload) => {
    return await User.create(payload);
  },
};
