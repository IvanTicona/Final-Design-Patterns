const FileProcessor = require('../strategies/FileProcessor');

exports.processFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No se subió ningún archivo' });
    }
    // Suponiendo que el tipo de archivo se envía en req.body.type ('image', 'audio', 'video')
    const type = req.body.type;
    const fileProcessor = new FileProcessor();
    const processedFile = fileProcessor.process(req.file, type);
    // processedFile.location contiene la URL del archivo en S3
    res.status(200).json({ fileUrl: processedFile.location });
  } catch (error) {
    console.error('Error procesando archivo:', error);
    res.status(500).json({ msg: 'Error procesando archivo' });
  }
};
