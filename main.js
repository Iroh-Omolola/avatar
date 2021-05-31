const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const multer = require ('multer');
const path = require ('path');
const process = require('process');
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require('./routes/indexRouter');
const cors = require('cors');

app.use(express.json());
app.use(userRouter);
app.use(cors());

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, '/images')
    },
    filename: (req, file, cb)=>{
      cb(null, Date.now()+ "--" + file.originalname);
    },
  });
  
  const upload = multer({storage: fileStorageEngine});
  
  app.post("/single", upload.single('image'), (req, res)=>{
  
    res.send("Single File uploaded success");
  });

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});