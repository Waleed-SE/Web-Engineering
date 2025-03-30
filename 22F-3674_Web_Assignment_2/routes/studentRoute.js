const express = require('express');
const { getStudent, registerCourse, dropCourse, completeCourse } = require('../controllers/studentController');
const { verifyToken, verifyStudent } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', verifyToken, verifyStudent, getStudent); // Fetch student details
router.post('/register-course', verifyToken, verifyStudent, registerCourse); // Register a course
router.post('/drop-course', verifyToken, verifyStudent, dropCourse); // Drop a course
router.post('/complete-course', verifyToken, verifyStudent, completeCourse); // Mark a course as complete

module.exports = router;
