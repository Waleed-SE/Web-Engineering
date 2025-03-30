const express = require('express');
const { getAllCourses, addCourse, updateCourse, deleteCourse, getAllStudents, overrideRegistration, updateSeats } = require('../controllers/adminController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/courses', getAllCourses);
router.post('/courses', verifyToken, verifyAdmin, addCourse);
router.put('/courses/:id', verifyToken, verifyAdmin, updateCourse);
router.delete('/courses/:id', verifyToken, verifyAdmin, deleteCourse);
router.put('/courses/:id/seats', verifyToken, verifyAdmin, updateSeats);

router.get('/students', verifyToken, verifyAdmin, getAllStudents);
router.post('/override-registration', verifyToken, verifyAdmin, overrideRegistration);

module.exports = router;
