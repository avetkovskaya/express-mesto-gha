const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const {
  JWT_SECRET,
  NOT_FOUND,
  ERROR_EMAIL_OR_PASSWORD,
} = require('../base');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .status(200)
        .send({ message: "Пользователь успешно авторизирован" });
    })
    .catch((err) => {
      if (err.message === NOT_FOUND) {
        return res
          .status(401)
          .send({ message: "Пользователя с таким email не существует" });
      }
      if (err.message === ERROR_EMAIL_OR_PASSWORD) {
        return res.status(401).send({ message: err.message });
      }
      return next();
    });
};
module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      Users.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
    )
    .then((user) => Users.findById(user._id))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(409)
          .send({ message: "Пользователь с таким email уже существует" });
      }
      return next();
    });
};
module.exports.getUsers = (req, res, next) => {
  Users.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};
module.exports.getUser = (req, res, next) => {
  Users.findById(req.params.userId || req.user._id)
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
          .send({ message: "Запрашиваемый пользователь не найден" });
      }
      return next();
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
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден" });
      }
      return next();
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
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден" });
      }
      return next();
    });
};
