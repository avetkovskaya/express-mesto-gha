const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});


app.use((req, res, next) => {
  req.user = {
    _id: '6f3c03ffa1a4240944133b409ad5ec5',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Некорректный путь запроса' });
});

app.listen(PORT);