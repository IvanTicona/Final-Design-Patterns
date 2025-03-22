const TextMessage = require('./TextMessage');
const ImageMessage = require('./ImageMessage');
const AudioMessage = require('./AudioMessage');
const VideoMessage = require('./VideoMessage');

class MessageFactory {
  static createMessage(type, options) {
    switch (type.toLowerCase()) {
      case 'text':
        return new TextMessage(options);
      case 'image':
        return new ImageMessage(options);
      case 'audio':
        return new AudioMessage(options);
      case 'video':
        return new VideoMessage(options);
      default:
        throw new Error(`Tipo de mensaje no soportado: ${type}`);
    }
  }
}

module.exports = MessageFactory;
