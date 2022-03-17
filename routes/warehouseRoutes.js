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
    if (err) {
      res.status(400).send("Error reading file");
    } else {
      res.json(warehousesData);
    }
  });
});

// Returns data for a specific warehouse by a given ID
router.get("/:id", (req, res) => {
  fs.readFile("./data/warehouses.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(501).send("Error reading data file.");
    } else {
      const warehousesData = JSON.parse(data);
      const reqWarehouse = warehousesData.find((warehouse) => {
        return warehouse.id === req.params.id;
      });
      console.log(reqWarehouse);
      if (reqWarehouse) {
        res.status(201).json(reqWarehouse);
      } else {
        res.status(404).json({
          message: "No warehouse with that id exists",
        });
      }
    }
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
    if (err) {
      res.status(400).send("Internal server error");
    } else {
      const warehousesData = JSON.parse(data);
      warehousesData.push(newWarehouse);
      fs.writeFile(
        "./data/warehouses.json",
        JSON.stringify(warehousesData),
        () => {
          res.send("Warehouse has been added");
        }
      );
    }
  });
});

router.put("/:id", (req, res) => {
  fs.readFile("./data/warehouses.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).send("Internal Server Error");
    } else {
      const whData = JSON.parse(data);
      const id = whData.findIndex((warehouse) => {
        return warehouse.id === req.params.id;
      });
      if (id >= 0) {
        whData[id]["name"] = req.body.whname;
        whData[id]["address"] = req.body.address;
        whData[id]["city"] = req.body.city;
        whData[id]["country"] = req.body.country;
        whData[id]["contact"]["name"] = req.body.country;
        whData[id]["contact"]["position"] = req.body.position;
        whData[id]["contact"]["phone"] = req.body.phone;
        whData[id]["contact"]["email"] = req.body.email;
        fs.writeFile(
          "./data/warehouses.json",
          JSON.stringify(whData),
          () => {
            res.send("Warehouse has been updated");
          }
        );
      } else {
        res.status(404).send("This warehouse does not exist in the database")
      }

    }
  });
});
module.exports = router;
