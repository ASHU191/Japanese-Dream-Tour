const Destination = require("../models/Destination");

// Create a new destination
exports.createDestination = async (req, res) => {
  const {
    title,
    description,
    destinationImage,
  } = req.body;
  try {
    const newDestination = new Destination({
      title,
      description,
      destinationImage,
    });
    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get all destinations
exports.getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Delete a destination
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ msg: "Destination not found" });
    }
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ msg: "Destination deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};


// Get destination by ID
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findOne({ id: req.params.id });
    if (!destination) return res.status(404).json({ message: "Destination not found" });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update destination
exports.updateDestination = async (req, res) => {
  const destination = await Destination.findById(req.params.id);
  try {
    let imageUrl = req.body.destinationImage;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }
  
    const updatedDestination = await Destination.findOneAndUpdate(
      { _id: req.params.id }, // Use an object with _id as the key
  {
    title: req.body.title,
    description: req.body.description,
    destinationImage: imageUrl
  },
  { new: true });
    if (!updatedDestination) return res.status(404).json({ message: "Destination not found" });
    res.json(updatedDestination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};