const FileStrategy = require('./FileStrategy');

class VideoStrategy extends FileStrategy {
  processFile(file) {
    console.log("Processing video file...");
    // Lógica para validar/transcodificar videos
    return file;
  }
}

module.exports = VideoStrategy;
