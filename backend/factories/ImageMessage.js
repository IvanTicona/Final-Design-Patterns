const Message = require('./Message');

class ImageMessage extends Message {
  constructor(options) {
    super({ ...options, type: 'image' });
  }

  getType() {
    return 'image';
  }
}

module.exports = ImageMessage;
