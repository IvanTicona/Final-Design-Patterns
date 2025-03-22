// middlewares/upload.js
const multer = require('multer');
const multerS3 = require('multer-s3-v3');
const s3 = require('../config/awsS3');

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    // Removemos la propiedad acl para evitar el error
    key: (req, file, cb) => {
      const fileName = `${Date.now().toString()}-${file.originalname}`;
      cb(null, fileName);
    }
  })
});

module.exports = upload;
