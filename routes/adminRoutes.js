const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require('../middlewares/auth')

router.post("/", adminController.createAdmin);
router.get("/", adminController.getAdmins);
router.get("/:id", adminController.deleteAdmin);

router.post('/login', adminController.adminLogin);
// Example protected route
// router.get('/admin-dashboard', authMiddleware, adminController.getAdminDashboard);

module.exports = router;
