const express = require("express");
const router = express.Router();
const userController = require("../controllers/studentController");

// Student-specific routes
router.post("/students", userController.createStudent); // Create a new student
router.get("/students/:id", userController.getStudent); // Get a student by ID
router.get("/students", userController.getAllStudents); // Get all students
router.put("/students/:id", userController.updateStudent); // Update a student
router.delete("/students/:id", userController.deleteStudent); // Delete a student
router.post("/students/book", userController.bookSession);
router.get("/students/:studentId/sessions", userController.getStudentSessions); // Get all sessions for the current student
router.delete(
  "/students/sessions/cancel/:sessionId",
  userController.cancelSession
);
router.put(
  "/students/sessions/reschedule/:sessionId",
  userController.rescheduleSession
);
router.post("/students/wishlist/add/:studentId", userController.addToWishlist);
router.get("/students/wishlist/:studentId", userController.getWishlist);
router.delete(
  "/students/wishlist/remove/:studentId",
  userController.removeFromWishlist
);
router.post(
  "/students/sessions/complete/:sessionId",
  userController.completeSession
);
router.get(
  "/students/sessions/completed/:studentId",
  userController.getCompletedSessions
);
router.post("/students/reviews", userController.submitReview);

module.exports = router;
