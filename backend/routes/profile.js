const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const profileController = require('../controllers/profileController');

// Endpoint para subir y actualizar la imagen de perfil
router.post('/upload-profile-picture', upload.single('profilePicture'), profileController.uploadProfilePicture);

module.exports = router;
