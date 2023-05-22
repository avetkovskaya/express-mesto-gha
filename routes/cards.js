const router = require('express').Router();
const {
  getCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

const {
  validateCardId,
  validateCard,
} = require('../middlewares/validator-check');

router.get('/', getCard);
router.post('/', validateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
