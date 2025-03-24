const ImageStrategy = require('./ImageStrategy');
const AudioStrategy = require('./AudioStrategy');
const VideoStrategy = require('./VideoStrategy');

class FileProcessor {
  constructor() {
    this.strategies = {
      image: new ImageStrategy(),
      audio: new AudioStrategy(),
      video: new VideoStrategy()
    };
  }

  process(file, type) {
    const strategy = this.strategies[type];
    if (!strategy) throw new Error("No strategy found for type: " + type);
    return strategy.processFile(file);
  }
}

module.exports = FileProcessor;
