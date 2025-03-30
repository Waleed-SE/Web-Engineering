const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Course = require("../models/course");

// Middleware to check if student is logged in
const isAuthenticated = (req, res, next) => {
  if (!req.session.student) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }
  next();
};

// 📌 1. Register for a Course
// 📌 Register for a Course using Course Code
router.post("/register", isAuthenticated, async (req, res) => {
  const studentId = req.session.student._id;
  const { code } = req.body; // Get courseCode from request body

  try {
    // Find course by its code
    const course = await Course.findOne({ code });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const student = await Student.findById(studentId);

    // Check if already registered
    if (student.registeredCourses.includes(course._id)) {
      return res.status(400).json({ message: "Already registered for this course" });
    }

    // Check available seats
    if (course.availableSeats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    // Register student
    student.registeredCourses.push(course._id);
    course.availableSeats -= 1;

    await student.save();
    await course.save();

    res.status(200).json({ message: "Successfully registered for course", course });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


// 📌 2. Get Registered Courses
router.get("/courses", isAuthenticated, async (req, res) => {
  const studentId = req.session.student._id;

  try {
    const student = await Student.findById(studentId).populate("registeredCourses");
    res.status(200).json({ registeredCourses: student.registeredCourses });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
