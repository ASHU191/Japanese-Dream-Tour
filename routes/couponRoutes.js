const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponController");

router.post("/", couponController.createCoupon);
router.get("/", couponController.getCoupons);
router.delete("/:id", couponController.deleteCoupon);

module.exports = router;
