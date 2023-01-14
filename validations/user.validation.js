const Joi = require('joi');

module.exports = {
  CreateValidation: (payload) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      confirm_password: Joi.string().valid(Joi.ref('password')).required(),
      role: Joi.string().valid('user', 'admin'),
    });

    return schema.validate(payload);
  },
};
