const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ini akan resolve ke: projectroot/uploads/menu (pasti benar)
const menuDir = path.join(__dirname, '..', '..', 'uploads', 'menu');
if (!fs.existsSync(menuDir)) {
  fs.mkdirSync(menuDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, menuDir); // <- PASTIKAN INI
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error('Only image files are allowed!'), false);
};

const uploadMenu = multer({ storage, fileFilter });
module.exports = uploadMenu;