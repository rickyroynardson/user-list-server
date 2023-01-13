const Joi = require('joi');

module.exports = {
  LoginValidation: (payload) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    return schema.validate(payload);
  },
  RegisterValidation: (payload) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      confirm_password: Joi.string().valid(Joi.ref('password')).required(),
    });
    return schema.validate(payload);
  },
};
