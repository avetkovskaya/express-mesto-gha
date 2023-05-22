const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  logout,
  createUser,
} = require('../controllers/users');

const {
  //validateUser,
  validateAvatar,
  validateUserId,
  validateSignIn,
} = require('../middlewares/validator-check');

router.get('/', getUsers);
router.get('/:userId', validateUserId, getUser);
//router.post('/', validateUser, createUser);
router.patch('/me', validateSignIn, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);
router.delete('/signout', logout);

module.exports = router;
