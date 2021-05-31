const express = require('express');
const multer = require('multer');
const dbClient = require('../database');
const router = express.Router();



// let id = 0;
router.use(express.json())
    //to post  player
router.route('/player')
    .post(async(req, res) => {
      const { name, position, clubname } = req.body;

      const query = `INSERT INTO players(name, position, clubname) VALUES ($1, $2, $3)`;
      const values = [name, position, clubname];
  
  
      await dbClient.query(query, values);
  
      message = "successfully added!"
  
      res.send({ message });
        
    });
router.route('/player/avatar/:id')
    //to get a player
    .put((req, res) => {
        const player = players.find(val => val.id === Number(req.params.id));
        return res.json(player);
    });
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
        [name, position,clubname, avatar, id],
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

    
     router.route('/player/avatar/:id')
     //to get an item 
     .put(async(req, res) => {
       const id = parseInt(req.params.id);
       
      //  await dbClient.query('SELECT * FROM players WHERE id = $1', [id], (error, results) => {
      //    if (error) {
      //      throw error
      //    }
      //    res.status(200).json(results.rows)
      //  })
     })
module.exports = router;