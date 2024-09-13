const Coupon = require("../models/Coupon");

// Create a new coupon
exports.createCoupon = async (req, res) => {
  const { name, discount, status } = req.body;
  try {
    const newCoupon = new Coupon({ name, discount, status });
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get all coupons
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Delete a coupon
exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({ msg: "Coupon not found" });
    }
    res.json({ msg: "Coupon deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
