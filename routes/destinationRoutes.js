const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");

router.post("/", destinationController.createDestination);
router.get("/", destinationController.getDestinations);
router.delete("/:id", destinationController.deleteDestination);
router.get('/getbyid:id', destinationController.getDestinationById);
router.put('/update/:id', destinationController.updateDestination);

module.exports = router;