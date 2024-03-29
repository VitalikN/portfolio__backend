const multer = require('multer');
const path = require('path');
const { HttpError } = require('../helpers');

const destination = path.resolve(__dirname, '../', 'temp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    const newName = `${uniquePrefix}_${file.originalname}`;
    cb(null, newName);
  },
});
const limits = {
  fileSize: 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  console.log(file.mimetype);
  const { mimetype } = file;
  if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
    cb(HttpError(400, 'Invalid file type! Please only .jpeg, .png'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = upload;
