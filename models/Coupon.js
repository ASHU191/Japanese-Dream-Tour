const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discount: { type: Number, required: true },
  status: { type: String, enum: ['active', 'inactive'], required: true }
});

module.exports = mongoose.model('Coupon', CouponSchema);
