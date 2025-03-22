const Message = require('./Message');

class VideoMessage extends Message {
  constructor(options) {
    super(options);
    this.videoUrl = options.videoUrl;
    this.resolution = options.resolution || '720p';
  }

  getType() {
    return 'video';
  }
}

module.exports = VideoMessage;
