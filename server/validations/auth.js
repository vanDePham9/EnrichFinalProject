const Joi = require("joi");

const registerValidator = (data) => {
  const rule = Joi.object({
    email: Joi.string().min(6).max(225).required().email(),
    password: Joi.string().min(1).max(30).required(),
    role: Joi.string().valid('admin','productManager', 'regularUser'),
  });

  return rule.validate(data);
};

module.exports.registerValidator = registerValidator;
