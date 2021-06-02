import express from 'express';
import userRouter from './routes/indexRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(userRouter);


// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb)=>{
//       cb(null, '/images')
//     },
//     filename: (req, file, cb)=>{
//       cb(null, Date.now()+ "--" + file.originalname);
//     },
//   });
  
//   const upload = multer({storage: fileStorageEngine});
  
//   app.post("/single", upload.single('image'), (req, res)=>{
  
//     res.send("Single File uploaded success");
//   });

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});