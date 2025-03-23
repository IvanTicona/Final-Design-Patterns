const FileStrategy = require('./FileStrategy');

class ImageStrategy extends FileStrategy {
  processFile(file) {
    // Lógica para validar o comprimir imágenes, si fuera necesario.
    console.log("Processing image file...");
    return file;
  }
}

module.exports = ImageStrategy;
