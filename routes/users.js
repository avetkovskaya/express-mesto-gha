<<<<<<< HEAD
const router = require('express').Router();
=======
const router = require("express").Router();

>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
<<<<<<< HEAD
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
=======
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateAvatar);
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b

module.exports = router;
