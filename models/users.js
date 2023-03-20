<<<<<<< HEAD
const mongoose = require('mongoose');

=======
const mongoose = require("mongoose");
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
<<<<<<< HEAD
      default: 'Жак-Ив Кусто',
=======
      default: "Жак-Ив Кусто",
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
<<<<<<< HEAD
      default: 'Исследователь',
=======
      default: "Исследователь",
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
    },
    avatar: {
      type: String,
    },
<<<<<<< HEAD
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
=======
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
>>>>>>> 825f75d9f8fd908763c0881e8d8a63ef7989e24b
