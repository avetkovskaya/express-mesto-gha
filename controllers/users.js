const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Users = require('../models/users');

const NOT_FOUND = 'NotFound';
const CAST_ERROR = 'CastError';

module.exports = { NOT_FOUND, CAST_ERROR };

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((allUsers) => res.send(allUsers));
};

module.exports.loginUser = (req, res, next) => {
  Users.findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key');

      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .status(200)
        .send({ user, message: 'Пользователь успешно авторизирован.' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({
          message: 'Ошибка пароля',
        });
      }

      if (err.message === NOT_FOUND) {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным email не найден' });
      }

      return next(err);
    });
};

module.exports.getUser = (req, res, next) => {
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
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => Users.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => Users.findById(user._id))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      }

      if (err.code === 11000) {
        return res.status(409).send({
          message: 'Пользователь с таким эмейл уже существует',
        });
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
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
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
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
      return next(err);
    });
};

module.exports.logout = (req, res) => {
  res
    .clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    .send({ message: 'Вы вышли.' });
};
