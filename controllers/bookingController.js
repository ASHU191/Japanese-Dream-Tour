const Booking = require("../models/Booking");

// Create a new booking
exports.createBooking = async (req, res) => {
  const { user, destination, date, status } = req.body;
  try {
    const newBooking = new Booking({ user, destination, date, status });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ msg: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
