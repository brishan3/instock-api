const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');



//
// Write code here
//
// get collection of warehouses 
router.get('/', (req, res) => {
    fs.readFile('./data/warehouses.json', 'utf-8', (err,data) => {
        const warehousesData = JSON.parse(data);
        res.json(warehousesData);
    });
});

// Returns data for a specific warehouse by a given ID
router.get('/:id', (req, res) => {
  fs.readFile('./data/warehouses.json', 'utf-8', (err,data) => {
    if (err) {
      console.log(err)
      res.status(501).send('Error reading data file.')
    } else {
      const warehousesData = JSON.parse(data);
      const reqWarehouse = warehousesData.find( (warehouse) => {
        return warehouse.id === req.params.id
      })
      console.log(reqWarehouse);
      if (reqWarehouse) {
        res.status(201).json(reqWarehouse);
      } else {
        res.status(404).json({
          message: 'No warehouse with that id exists',
        })
      }
    }
  });
})


module.exports = router;