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


module.exports = router;