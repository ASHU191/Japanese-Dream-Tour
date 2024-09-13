const Tour = require("../models/TourModel");

// Create a new Tour
exports.createTour = async (req, res) => {
  const {
    title,
    description,
    packagePrice,
    days,
    cityName,
    placeName,
    destinationImage,
    latitude,
    longitude
  } = req.body;
  if (req.file) {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Get image URL from Cloudinary response
    imageUrl = result.secure_url;

    // Optional: Delete the temporary file
    fs.unlinkSync(req.file.path);
  }

  try {
    const newTour = new Tour({
        title,
        description,
        packagePrice,
        days,
        cityName,
        placeName,
        destinationImage,
        latitude,
        longitude
    });
    await newTour.save();
    res.status(201).json(newTour);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get all Tours
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Delete a Tour
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: "Tour not found" });
    }
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ msg: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};


exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    let imageUrl = req.body.destinationImage;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        packagePrice: req.body.packagePrice,
        days: req.body.days,
        cityName: req.body.cityName,
        destinationImage: imageUrl,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      },
      { new: true }
    );

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};