const Message = require('./Message');

class ImageMessage extends Message {
  constructor(options) {
    super(options);
    this.imageUrl = options.imageUrl;
  }

  getType() {
    return 'image';
  }
}

module.exports = ImageMessage;
