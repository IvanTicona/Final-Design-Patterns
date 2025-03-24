const FileProcessor = require('../strategies/FileProcessor');

exports.processFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No se subió ningún archivo' });
    }
    const type = req.body.type || 'image';
    const fileProcessor = new FileProcessor();
    const processedFile = fileProcessor.process(req.file, type);

    return res.status(200).json({ fileUrl: processedFile.location });
  } catch (error) {
    console.error('Error procesando archivo:', error);
    return res.status(500).json({ msg: 'Error procesando archivo' });
  }
};
