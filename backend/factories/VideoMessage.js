const Message = require('./Message');

class VideoMessage extends Message {
  constructor(options) {
    super({ ...options, type: 'video' });
    this.resolution = options.resolution || '720p';
  }
  getType() {
    return 'video';
  }
}

module.exports = VideoMessage;
