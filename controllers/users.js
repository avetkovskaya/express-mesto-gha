const mongoose = require('mongoose');
const Users = require('../models/users');

const NOT_FOUND = 'NotFound';
const CAST_ERROR = 'CastError';

module.exports = { NOT_FOUND, CAST_ERROR };

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((allUsers) => res.send(allUsers));
};

module.exports.loginUser = (req, res) => {
  Users.findByIdAndUpdate(req.user.email, req.user.password, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(400)
          .send({
            message: 'Ошибка пароля',
          });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным email не найден' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.getUser = (req, res) => {
  Users.findById(req.params.userId)
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при поиске пользователя',
          });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  Users.create(req.body)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при создании пользователя',
          });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  Users.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при обновлении профиля',
          });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  Users.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(400)
          .send({
            message: ' Переданы некорректные данные при обновлении аватара',
          });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.logout = (req, res) => {
  res
    .clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    .send({ message: 'Вы вышли.' });
};
