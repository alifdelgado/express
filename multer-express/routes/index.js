const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "public/images/uploads" });
const fs = require('fs');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/formsub', upload.single('file'), (req, res, next) => {
  const newPath = `public/images/uploads/${req.file.originalname}`;
  fs.rename(req.file.path, newPath, (err) => {
    if(err) throw err;
    res.json("file uploaded!");
  });
});

module.exports = router;
