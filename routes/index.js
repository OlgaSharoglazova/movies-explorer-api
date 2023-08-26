const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { register, login } = require('../controllers/users');
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/notFound');

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), register);

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

routes.use('/users', auth, userRoutes);
routes.use('/movies', auth, moviesRoutes);
routes.use('*', auth, (_req, _res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = routes;
