const jsonwebtoken = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized-error');
const { NODE_ENV, JWT_SECRET } = require('../index');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(
      jwt,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
