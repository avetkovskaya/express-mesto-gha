<<<<<<< HEAD
const mongoose = require('mongoose');
const Users = require('../models/users');

const NOT_FOUND = 'NotFound';
const CAST_ERROR = 'CastError';

module.exports = { NOT_FOUND, CAST_ERROR };
=======
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = require("../models/users");
const { NOT_FOUND, CAST_ERROR } = require("../base");
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).send({ message: err.message });
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
<<<<<<< HEAD
            message: 'Переданы некорректные данные при поиске пользователя',
=======
            message: "Переданы некорректные данные при поиске пользователя",
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
          });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
<<<<<<< HEAD
          .send({ message: 'Запрашиваемый пользователь не найден' });
=======
          .send({ message: "Запрашиваемый пользователь не найден" });
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
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
<<<<<<< HEAD
            message: 'Переданы некорректные данные при создании пользователя',
=======
            message: "Переданы некорректные данные при создании пользователя",
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
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
<<<<<<< HEAD
            message: 'Переданы некорректные данные при обновлении профиля',
=======
            message: "Переданы некорректные данные при обновлении профиля",
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
          });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
<<<<<<< HEAD
          .send({ message: 'Пользователь с указанным _id не найден' });
=======
          .send({ message: "Пользователь с указанным _id не найден" });
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
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
<<<<<<< HEAD
            message: ' Переданы некорректные данные при обновлении аватара',
=======
            message: " Переданы некорректные данные при обновлении аватара",
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
          });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
<<<<<<< HEAD
          .send({ message: 'Пользователь с указанным _id не найден' });
=======
          .send({ message: "Пользователь с указанным _id не найден" });
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
      }
      return res.status(500).send({ message: err.message });
    });
};
