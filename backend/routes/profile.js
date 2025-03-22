const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { uploadProfilePicture } = require('../controllers/profileController');

router.post('/upload-profile-picture', upload.single('profilePicture'), uploadProfilePicture);

module.exports = router;
