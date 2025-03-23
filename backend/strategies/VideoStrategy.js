const FileStrategy = require('./FileStrategy');

class VideoStrategy extends FileStrategy {
  processFile(file) {
    // Lógica para validar, comprimir o transcodificar videos.
    console.log("Processing video file...");
    return file;
  }
}

module.exports = VideoStrategy;
