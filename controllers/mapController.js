const Map = require("../models/Map");

// Create a new map entry
exports.createMap = async (req, res) => {
  const { name, coordinates } = req.body;
  try {
    const newMap = new Map({ name, coordinates });
    await newMap.save();
    res.status(201).json(newMap);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get all maps
exports.getMaps = async (req, res) => {
  try {
    const maps = await Map.find();
    res.json(maps);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Delete a map entry
exports.deleteMap = async (req, res) => {
  try {
    const map = await Map.findById(req.params.id);
    if (!map) {
      return res.status(404).json({ msg: "Map not found" });
    }
    await Map.findByIdAndDelete(req.params.id);
    res.json({ msg: "Map deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
