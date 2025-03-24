const FileStrategy = require('./FileStrategy');

class AudioStrategy extends FileStrategy {
  processFile(file) {
    console.log("Processing audio file...");
    // Lógica para validar/transcodificar audio
    return file;
  }
}

module.exports = AudioStrategy;
