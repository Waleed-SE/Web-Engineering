const express = require("express");
const router = express.Router();
const session = require("express-session");
const Course = require("../models/course");

// Dummy Admin Credentials (replace with database later)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123", // In real apps, use bcrypt for password hashing
};

// Admin Login
router.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    req.session.admin = username; // Store admin session
    return res.status(200).json({ message: "Admin login successful" });
  }

  res.status(400).json({ message: "Invalid credentials" });
});

// Admin Logout
router.post("/admin/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Admin logged out successfully" });
});

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (!req.session.admin) {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

// Add a New Course
router.post("/course", isAdmin, async (req, res) => {
    const { code, name, department, schedule, availableSeats, totalSeats } = req.body;


  try {
    // Check if course already exists
    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ message: "Course already exists" });
    }

    // Create and save course
    const newCourse = new Course({ code, name, department, schedule, availableSeats, totalSeats });
    await newCourse.save();

    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a Course
router.put("/course/:code", isAdmin, async (req, res) => {
  const { name, department, schedule, availableSeats, totalSeats } = req.body;
  const { code } = req.params;

  try {
    const updatedCourse = await Course.findOneAndUpdate(
        { code: req.params.code }, // Match by course code
        { name, department, schedule, availableSeats, totalSeats },
        { new: true }
      );
      

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res
      .status(200)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a Course
router.delete("/course/:code", isAdmin, async (req, res) => {
  const { code } = req.params;

  try {
    const deletedCourse = await Course.findOneAndDelete({ code });

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Courses
router.get("/courses", isAdmin, async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
