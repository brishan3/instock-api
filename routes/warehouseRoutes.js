const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

//
// Write code here
//
// get collection of warehouses
router.get("/", (req, res) => {
  fs.readFile("./data/warehouses.json", "utf-8", (err, data) => {
    const warehousesData = JSON.parse(data);
    res.json(warehousesData);
  });
});

router.post("/", (req, res) => {

  const newWarehouse = {
    id: uuidv4(),
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    contact: {
      name: req.body.name,
      position: req.body.position,
      phone: req.body.phone,
      email: req.body.email,
    },
  };
  fs.readFile("./data/warehouse.json", "utf8", (err, data) => {
    const warehousesData = JSON.parse(data);
    warehousesData.push(newWarehouse);
    fs.writeFile(
      "./data/warehouse.json",
      JSON.stringify(warehousesData),
      () => {
        res.json(warehousesData);
      }
    );
  });
});

module.exports = router;
