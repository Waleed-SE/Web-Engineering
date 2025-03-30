const express = require("express");
const router = express.Router();
const tutorController = require("../controllers/tutorController");

// Tutor-specific routes
router.post("/tutors", tutorController.createTutor); // Create a new tutor
router.get("/tutors/:id", tutorController.getTutor); // Get a tutor by ID
router.put("/tutors/:id", tutorController.updateTutor); // Update a tutor
router.delete("/tutors/:id", tutorController.deleteTutor); // Delete a tutor
router.get("/tutors", tutorController.getAllTutors); // Get all tutors
router.get("/tutors/:tutorId/sessions", tutorController.getTutorSessions); // Get all sessions of a tutor (with filtering)
router.get("/tutors/:tutorId/booked-sessions", tutorController.getBookedSlots); // Get all sessions except pending and completed

module.exports = router;
