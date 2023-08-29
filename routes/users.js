const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser,
  getUser,
} = require('../controllers/users');

userRoutes.get('/me', getUser);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
}), updateUser);

module.exports = userRoutes;
