const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Bonjour = require('bonjour');

const app = express();
// const PORT = 5000;
const PORT = process.env.PORT || 5000;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});
const upload = multer({ storage });


app.use(cors());

app.use(express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
  res.send({
    message: 'File uploaded!',
    filename: req.file.originalname, 
  });
});


app.get('/files', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');

  fs.readdir(directoryPath, (err, files) => {
    if (err) return res.status(500).send('Unable to scan files');

    const fileInfos = files.map(file => ({
      filename: file,
      url: `http://${req.hostname}:${PORT}/${encodeURIComponent(file)}`
    }));

    res.send(fileInfos);
  });
});


const bonjour = Bonjour();
bonjour.publish({ name: 'FileShareDevice', type: 'http', port: PORT });


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
