const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });
  
  

router.post("/", tourController.createTour);
router.get("/", tourController.getTours);
router.delete("/:id", tourController.deleteTour);
router.get('/:id', tourController.getTourById);
router.put('/update/:id', upload.single('destinationImage'), tourController.updateTour);

module.exports = router;