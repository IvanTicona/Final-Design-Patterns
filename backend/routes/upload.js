const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

// TODO Refactor this!
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No se subió el archivo' });
  }
  res.json({ fileUrl: req.file.location });
});

module.exports = router;
