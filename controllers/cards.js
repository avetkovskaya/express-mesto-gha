<<<<<<< HEAD
const { default: mongoose } = require('mongoose');
const { NOT_FOUND, CAST_ERROR } = require('./users');

const Cards = require('../models/cards');
=======
const { default: mongoose } = require("mongoose");
const Cards = require("../models/cards");
const { NOT_FOUND, CAST_ERROR } = require("../base");
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b

module.exports.getCard = (req, res) => {
  Cards.find({})
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res
          .status(400)
          .send({
<<<<<<< HEAD
            message: 'Переданы некорректные данные при создании карточки',
=======
            message: "Переданы некорректные данные при создании карточки",
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
          });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .orFail(new Error(NOT_FOUND))
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res
          .status(400)
<<<<<<< HEAD
          .send({ message: 'Переданы некорректные данные карточки' });
=======
          .send({ message: "Переданы некорректные данные карточки" });
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
<<<<<<< HEAD
          .send({ message: 'Карточка с указанным _id не найдена' });
=======
          .send({ message: "Карточка с указанным _id не найдена" });
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
<<<<<<< HEAD
    { new: true },
=======
    { new: true }
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
  )
    .orFail(new Error(NOT_FOUND))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res
          .status(400)
          .send({
<<<<<<< HEAD
            message: 'Переданы некорректные данные для постановки лайка',
=======
            message: "Переданы некорректные данные для постановки лайка",
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
          });
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
<<<<<<< HEAD
          .send({ message: 'Передан несуществующий _id карточки' });
=======
          .send({ message: "Передан несуществующий _id карточки" });
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
<<<<<<< HEAD
    { new: true },
=======
    { new: true }
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
  )
    .orFail(new Error(NOT_FOUND))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res
          .status(400)
<<<<<<< HEAD
          .send({ message: 'Переданы некорректные данные для снятии лайка' });
=======
          .send({ message: "Переданы некорректные данные для снятии лайка" });
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
      }
      if (err.message === NOT_FOUND) {
        return res
          .status(404)
<<<<<<< HEAD
          .send({ message: 'Передан несуществующий _id карточки' });
=======
          .send({ message: "Передан несуществующий _id карточки" });
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
      }
      return res.status(500).send({ message: err.message });
    });
};
