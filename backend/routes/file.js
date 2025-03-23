const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const fileController = require('../controllers/fileController');

router.post('/upload', upload.single('file'), fileController.processFileUpload);

module.exports = router;
