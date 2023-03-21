const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});
app.use((req, res, next) => {
  req.user = {
    _id: '6418a6709e340b3d3195ed95',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Некорректный путь запроса' });
});

app.listen(PORT);
