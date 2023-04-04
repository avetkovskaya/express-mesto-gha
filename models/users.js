/* eslint-disable import/no-extraneous-dependencies */
const { isEmail, isURL } = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { NOT_FOUND } = require('../base');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: [isURL, 'Некорректный URL адрес.'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'Некорректный email адрес.'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);
userSchema.statics.findUserByCredentials = function auth(email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(new Error(NOT_FOUND))
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
        }
        return user;
      });
    });
};
module.exports = mongoose.model('user', userSchema);
