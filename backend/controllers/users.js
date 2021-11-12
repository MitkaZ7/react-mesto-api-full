const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const BadReqError = require('../errors/BadReqError');
const ExistUserError = require('../errors/ExistUserError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId).then((user) => {
    if (user) {
      return res.status(200).send(user);
    }
    throw new NotFoundError('Пользователь с указанным _id не найден.');
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReqError('Передан невалидный _id'));
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      throw new ExistUserError('Пользователь с данным email уже cуществует');
    }
    bcrypt.hash(req.body.password, 10).then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then(() => res.status(200).send({ message: 'Вы успешно зарегистрировались!' }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadReqError('Передан невалидные данные'));
        }
        next(err);
      }));
  })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным ID не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

module.exports.updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new BadReqError('Ошибка валидации');
      }
      res.send({ user });
    })
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неверный логин или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неверный логин или пароль');
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};
