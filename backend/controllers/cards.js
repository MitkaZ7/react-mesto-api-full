const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadReqError = require('../errors/BadReqError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadReqError('Ошибка валидации');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    })
    .then((card) => {
      if (ownerId.toString() === card.owner._id.toString()) {
        Card.deleteOne(card).then(() => {
          res.send({ data: card });
        });
      } else {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(' _id карточки не существует');
    })
    .then((card) => {
      if (!card) {
        throw new BadReqError('Ошибка валидации');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('не найдено');
    })
    .then((card) => {
      if (!card) {
        throw new BadReqError('Ошибка валидации');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
};
