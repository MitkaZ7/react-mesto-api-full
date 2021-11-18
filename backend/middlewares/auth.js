require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthError('Вы не авторизованы!');
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new AuthError('Вы не авторизованы!');
  }

  req.user = payload;

  next();
};
