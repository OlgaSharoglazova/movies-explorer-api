require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const errorsCode = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { DB_URL } = require('./utils/config');

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cors);

app.use(requestLogger);

app.use(routes);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(errorLogger);
app.use(errors());
app.use(errorsCode);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
