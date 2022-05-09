const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    username: Joi.string().min(2).max(50).required(),
    phone: Joi.string().required(),
    role: Joi.string().valid("audience", "admin"),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

const seatValidation = (data) => {
  const schema = Joi.object({
    area: Joi.string().required(),
    row: Joi.number().required(),
    col: Joi.number().required(),
    // isSeat: Joi.boolean().required(),
    sold: Joi.number().required(),
  });
  return schema.validate(data);
};

const friendsValidation = (data) => {
  const schema = Joi.array()
    .max(6)
    .unique("friendName")
    .items(
      Joi.object({
        friendName: Joi.string().required(),
        friendPhone: Joi.string().required(),
        _id: Joi.string(),
      })
    );
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.seatValidation = seatValidation;
module.exports.friendsValidation = friendsValidation;
