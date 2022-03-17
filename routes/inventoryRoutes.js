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

// Returns a collection of inventory items associated with a warehouse ID
router.get("/warehouse/:id", (req, res) => {
  fs.readFile("./data/inventories.json", "utf8", (err, data) => {
    if (err) {
      res.status(501).send("Error reading file");
    } else {
      const inventoriesData = JSON.parse(data);
      const reqInventoryData = inventoriesData.filter((item) => {
        return item.warehouseID === req.params.id;
      });
      if (reqInventoryData) {
        res.status(201).json(reqInventoryData);
      } else {
        res.status(404).json({
          message: "No warehouse with that id exists",
        });
      }
    }
  });
});

router.post("/", (req, res) => {
  const newInventory = {
    id: req.body.id,
    warehouseID: req.body.warehouseID,
    warehouseName: req.body.warehouseName,
    itemName: req.body.itemName,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    quantity: req.body.quantity,
  };
  fs.readFile("./data/inventories.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).send("Error reading inventory datas");
    } else {
      const inventoriesData = JSON.parse(data);
      inventoriesData.push(newInventory);
      fs.writeFile(
        "./data/inventories.json",
        JSON.stringify(inventoriesData),
        () => {
          res.json(inventoriesData);
        }
      );
    }
  });
});

module.exports = router;
