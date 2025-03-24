const Message = require('./Message');

class AudioMessage extends Message {
  constructor(options) {
    super({ ...options, type: 'audio' });
    this.duration = options.duration || 0;
  }
  getType() {
    return 'audio';
  }
}

module.exports = AudioMessage;
