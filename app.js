require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const NotFound = require('./errors/notFound');
const errorsCode = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cors);

app.use(requestLogger);

app.use(routes);

app.use('*', (_req, _res, next) => {
  next(new NotFound('Страница не найдена'));
});

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(errorLogger);
app.use(errors());
app.use(errorsCode);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
