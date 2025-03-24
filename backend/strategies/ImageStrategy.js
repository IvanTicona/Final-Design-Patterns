const FileStrategy = require('./FileStrategy');

class ImageStrategy extends FileStrategy {
  processFile(file) {
    console.log("Processing image file...");
    // Lógica para validar/comprimir imágenes
    return file;
  }
}

module.exports = ImageStrategy;
