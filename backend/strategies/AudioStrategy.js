const FileStrategy = require('./FileStrategy');

class AudioStrategy extends FileStrategy {
  processFile(file) {
    // Lógica para validar o transcodificar audio.
    console.log("Processing audio file...");
    return file;
  }
}

module.exports = AudioStrategy;
