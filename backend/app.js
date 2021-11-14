const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// const allowedCors = [
//   'https://locus.nomoredomains.rocks',
//   'http://locus.nomoredomains.rocks',
//   'http://localhost:3000',
// ];
// app.use(
//   cors({
//     credentials: true,
//     origin(origin, callback) {
//       if (allowedCors.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//   }),
// );

const options = {
  origin: [
    'https://locus.nomoredomains.rocks',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.options('*', cors(options));

app.use(cookieParser());

app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/[-a-zA-Z0-9@:%_\\+.~#?&\\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\\+.~#?&\\/=]*)?/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('/', () => {
  throw new NotFoundError('страницы не существует');
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка сервера'
        : message,
    });
  next();
});

app.listen(PORT);
