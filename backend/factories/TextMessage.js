const Message = require('./Message');

class TextMessage extends Message {
  constructor(options) {
    super(options);
  }

  getType() {
    return 'text';
  }
}

module.exports = TextMessage;
