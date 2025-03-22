const Message = require('./Message');

class AudioMessage extends Message {
  constructor(options) {
    super(options);
    this.audioUrl = options.audioUrl;
    this.duration = options.duration || 0; // duración en segundos
  }

  getType() {
    return 'audio';
  }
}

module.exports = AudioMessage;
