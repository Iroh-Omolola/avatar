import express from 'express';
import path from 'path';
import dbClient from '../database.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

 const __dirname = path.resolve();

const router = express.Router();



// let id = 0;
router.use(express.json())
    //to post  player
router.route('/player')
    .post(async(req, res) => {
      const { name, position, clubname, avatar } = req.body;

      const query = `INSERT INTO players(name, position, clubname, avatar) VALUES ($1, $2, $3, $4)`;
      const values = [name, position, clubname, avatar];
  
  
      await dbClient.query(query, values);
  
      res.json({ message: "successfully added!" });
        
    });
router.route('/player/avatar/:id')
    //to get a player
    
router.route('/player/:id')
    //to get an item 
    .get(async(req, res) => {
      const id = parseInt(req.params.id);
      
      await dbClient.query('SELECT * FROM players WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
    })
    //to edit a player
    .patch(async(req, res) => {
      const id = parseInt(req.params.id)
      const { name, position,clubname, avatar } = req.body;
    
      await dbClient.query(
        'UPDATE players SET name = $1, position = $2, clubname = $3, avatar= $4 WHERE id = $5',
        [name, position,clubname, id],
        (error, results) => {
          if (error) {
            throw error
          }
          res.status(200).send(`User modified with ID: ${id}`)
        }
      )
    })
    //to delete a player
    .delete(async(req, res) => {
      const id = parseInt(req.params.id);
      
      await dbClient.query('DELETE FROM players WHERE id = $1', [id], (error, results) => {
         if (error) {
           throw error
         }
         res.status(200).send(`User deleted with ID: ${id}`)
       })
     });
     
     // FILESTORAGE FOR MULTER
const file_storage_eng = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../avatar/')),
  filename: (req, file, cb) => cb(null, "db_img" + Math.round(Math.random() * 500) + file.originalname)
});

const upload = multer({ storage: file_storage_eng });


router
  .route("/player/avatar/:id")
  .put(upload.single("avatar"), async (req, res) => {

     //to get an item 
       const id = parseInt(req.params.id);
       const {filename} = req.file;
       await dbClient.query('UPDATE players SET  avatar= $1 WHERE id = $2',
       [filename, id], (error, results) => {
         if (error) {
           throw error
         }
         res.status(200).json({msg:"avatar image uploaded"})
       })
    //  
  })
export default router;