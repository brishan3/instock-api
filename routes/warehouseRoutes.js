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
    name: req.body.whname,
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
  fs.readFile("./data/warehouses.json", "utf8", (err, data) => {
    const warehousesData = JSON.parse(data);
    warehousesData.push(newWarehouse);
    fs.writeFile(
      "./data/warehouses.json",
      JSON.stringify(warehousesData),
      () => {
        res.send("Warehouse has been added");
      }
    );
  });
});

module.exports = router;
