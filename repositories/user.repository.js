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
  UpdateUser: async (id, payload) => {
    return await User.findByIdAndUpdate(id, payload);
  },
  DestroyUser: async (id) => {
    return await User.findByIdAndDelete(id);
  },
};
