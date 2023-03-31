const mongoose = require('mongoose');
const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NOT_FOUND = 'NotFound';
const CAST_ERROR = 'CastError';
const _id = 'd285e3dceed844f902650f40';
module.exports = { NOT_FOUND, CAST_ERROR, JWT_SECRET };

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.getUser = (req, res) => {
  Users.findById(req.user._id)
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res.status(400).send({ message: 'Переданы некорректные данные при поиске пользователя' });
      }
      if (err.message === NOT_FOUND) {
        return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  Users.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      if (err.message === NOT_FOUND) {
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  Users.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: ' Переданы некорректные данные при обновлении аватара' });
      }
      if (err.message === NOT_FOUND) {
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => Users.create({
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      if (err.code === 11000) {
        return res.status(450).send({ message: 'Email занят' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email })
    .select('password')
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Неправильные почта или пароль' });
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7 });
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return res.status(401).send({ message: 'Неправильные почта или пароль' });
      }
      return res.status(200).send({ message: 'Пользователь авторизован' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ message: ' Переданы некорректные данные при авторизации' });
      }
      if (err.message === NOT_FOUND) {
        return res.status(404).send({ message: 'Пользователь с указанным email не найден' });
      }
      return res.status(500).send({ message: err.message });
    });
};