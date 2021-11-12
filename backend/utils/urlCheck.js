const validator = require('validator');

const urlCheck = (value) => {
  const result = validator.isURL(value, { require_protocol: true });
  if (result) {
    return value;
  }
  throw new Error('URL не валиден');
};

module.exports = urlCheck;
