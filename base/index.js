const CAST_ERROR = 'CastError';
const REGEX_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;
const VALIDATION_ERROR = 'Validation failed';
const JWT_SECRET = '3fac2510da4fe921dc42e30f493f1a68a6cf67c9e8dd82a737561a0751132fef';

const allowedCors = [
  'https://avetkovskaya.mesto.nomoredomains.icu',
  'http://avetkovskaya.mesto.nomoredomains.icu',
  'http://localhost:3000',
];

module.exports = {
  CAST_ERROR,
  REGEX_URL,
  VALIDATION_ERROR,
  allowedCors,
  JWT_SECRET,
};
