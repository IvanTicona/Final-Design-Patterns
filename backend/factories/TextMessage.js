const Message = require('./Message');

class TextMessage extends Message {
  constructor(options) {
    super({ ...options, type: 'text' });
  }
  getType() {
    return 'text';
  }
}

module.exports = TextMessage;
