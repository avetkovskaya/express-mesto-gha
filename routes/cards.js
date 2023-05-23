const router = require('express').Router();
const {
  getCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

const {
  validateCard,
  validateUserId,

} = require('../middlewares/validator-check');

router.get('/', getCard);
router.post('/', validateCard, createCard);
router.delete('/:cardId', validateUserId, deleteCard);
router.put('/:cardId/likes', validateUserId, likeCard);
router.delete('/:cardId/likes', validateUserId, dislikeCard);

module.exports = router;
