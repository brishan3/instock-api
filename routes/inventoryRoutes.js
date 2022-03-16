const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

//Route to GET collection of inventory as array of object
router.get("/", (req, res) => {
  fs.readFile("./data/inventories.json", "utf8", (err, data) => {
    const inventoriesData = JSON.parse(data);
    if (err) {
      res.status(400).send("Error reading file");
    } else {
      res.json(inventoriesData);
    }
  });
});

module.exports = router;
