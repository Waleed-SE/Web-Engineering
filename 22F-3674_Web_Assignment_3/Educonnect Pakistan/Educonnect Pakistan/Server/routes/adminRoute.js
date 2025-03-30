const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin-specific routes
router.post("/admins", adminController.createAdmin); // Create a new admin
router.get("/admins/:id", adminController.getAdmin); // Get an admin by ID
router.put("/admins/:id", adminController.updateAdmin); // Update an admin
router.delete("/admins/:id", adminController.deleteAdmin); // Delete an admin
router.get("/admins", adminController.getAllAdmins); // Get all admins

module.exports = router;
