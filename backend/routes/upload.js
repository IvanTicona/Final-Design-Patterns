const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

// Endpoint para subir un único archivo (se espera un campo "file" en el form-data)
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No se subió el archivo' });
  }
  // Retorna la URL del archivo subido
  res.json({ fileUrl: req.file.location });
});

module.exports = router;
