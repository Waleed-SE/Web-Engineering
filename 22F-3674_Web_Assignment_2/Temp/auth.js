const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const session = require("express-session");

// Student Login
router.post("/student/login", async (req, res) => {
  const { rollNumber } = req.body;

  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(400).json({ message: "Invalid roll number" });
    }

    req.session.student = student; // Store student session
    res.status(200).json({ message: "Login successful", student });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Student Logout
router.post("/student/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
