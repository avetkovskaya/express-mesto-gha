const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const { errors } = require('celebrate');
const authRequier = require('./middlewares/auth-required');
const { errorProcessing } = require('./middlewares/errors-processing');
const { errorLogger, requestLogger } = require('./middlewares/winston-logger');
const permitCors = require('./middlewares/permitCors');
const { MONGODB_URL, PORT } = require('./index');

const app = express();

mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(permitCors);
app.use(require('./routes/auth'));

app.use(authRequier);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);
app.use(requestLogger);
app.use(errors());
app.use(errorProcessing);
app.use(express.json());
app.listen(PORT);
