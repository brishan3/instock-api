const { json } = require("express");
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

//Route to GET single inventory by ID
router.get("/:id", (req, res) => {
  fs.readFile("./data/inventories.json", "utf8", (err, data) => {
    const inventoriesData = JSON.parse(data);
    const foundInventory = inventoriesData.find(
      (inventory) => inventory.id === req.params.id
    );
    if (foundInventory) {
      res.json(foundInventory);
    } else {
      console.log(err);
      res.status(400).send("No inventory found with this id");
    }
  });
});

module.exports = router;
