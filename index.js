const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const BodyParser = require('body-parser')
const multer = require('multer')
const fs = require('file-system')
const path = require('path')

app.use(cors());

//! BodyParser *************************************
app.use(BodyParser.urlencoded ({extended: true}) )
app.use(BodyParser.json() )
//! ************************************************

//! Storage ****************************************
const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
   cb(null, path.join(__dirname + '/uploads/'))
   },
   filename: function (req, file, cb) {
     cb(null, file.originalname)
   }
})
const fileFilter = (req, file, cb) => {
  
  if(file.mimetype === "image/png" || 
  file.mimetype === "image/jpg"|| 
  file.mimetype === "image/jpeg"){
    cb(null, true);
  }
  else{
    cb(null, false);
  }
}
const upload = multer({ dest: 'uploads/', storage: storageConfig, fileFilter: fileFilter});
//! ************************************************


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/desinger', upload.single('upload'), (req, res) => {
    req.body.type = 'desinger';

    if (req.file) {
      req.body.isPhoto = true;
    }

    console.log(req.body);
    res.status(200).json(req.body);
})

app.post('/question', upload.single('upload'), (req, res) => {
    req.body.type = 'question'

    if (req.file) {
      req.body.isPhoto = true;
    }

    console.log(req.body);
    res.status(200).json(req.body);
})

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})