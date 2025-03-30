const User = require("../models/User");
const Session = require("../models/Session");
const Review = require("../models/Review");

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, password, role, bio } = req.body;

    if (role !== "student") {
      return res.status(400).json({ message: "Role must be 'student'" });
    }

    const newStudent = new User({
      name,
      email,
      password,
      role,
      bio,
      wishlist: [], // Default empty wishlist
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
};

// Get a student by ID
exports.getStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id)
      .where("role")
      .equals("student");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const { name, email, password, bio, wishlist } = req.body;

    const student = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, bio, wishlist },
      { new: true }
    )
      .where("role")
      .equals("student");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await User.findByIdAndDelete(req.params.id)
      .where("role")
      .equals("student");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

exports.bookSession = async (req, res) => {
  try {
    const { student, tutor, date, day, time, period, sessionType, price } =
      req.body; // Extract booking details from request body

    // Validate existence of student and tutor
    const studentExists = await User.findById(student)
      .where("role")
      .equals("student");
    const tutorExists = await User.findById(tutor)
      .where("role")
      .equals("tutor");

    if (!studentExists) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!tutorExists) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    // Check for conflicting sessions based on day, time, period, and status "pending"
    const conflict = await Session.findOne({
      tutor, // Specific tutor
      day, // Same day
      time, // Same time slot
      period, // Same time period (AM/PM)
      date,
      status: "pending", // Conflicting sessions with "pending" status only
    });

    if (conflict) {
      return res.status(400).json({
        message: "Tutor is already booked for this day, time, and period.",
      });
    }

    // Create a new session
    const newSession = new Session({
      student,
      tutor,
      date,
      day,
      time,
      period,
      sessionType,
      price,
      status: "pending", // Default status
    });

    await newSession.save(); // Save the session to the database

    res.status(201).json({
      message: "Session successfully booked",
      session: newSession,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking session", success: false, error });
  }
};

exports.getStudentSessions = async (req, res) => {
  try {
    const { studentId } = req.params; // Extract student ID from route parameters
    const { date, status, tutor } = req.query; // Extract optional filters from the query parameters

    // Build a dynamic query object
    const query = { student: studentId }; // Only fetch sessions for the current student

    // Add filters to the query if they are present
    if (date) {
      query.date = { $eq: new Date(date) }; // Filter by specific date
    }

    if (status) {
      query.status = status; // Filter by session status (e.g., "pending", "completed", etc.)
    }

    if (tutor) {
      query.tutor = tutor; // Filter by tutor ID
    }

    // Fetch sessions based on the query
    const sessions = await Session.find(query)
      .populate("student", "name email") // Populate student details
      .populate("tutor", "name email") // Populate tutor details
      .sort({ date: 1, time: 1 }); // Sort by date and time

    res.status(200).json({
      message: "Student's sessions fetched successfully",
      sessions,
    });
  } catch (error) {
    console.error("Error fetching student's sessions:", error);
    res
      .status(500)
      .json({ message: "Error fetching student's sessions", error });
  }
};

exports.cancelSession = async (req, res) => {
  try {
    const { sessionId } = req.params; // Extract the session ID from the route parameters

    // Find the session by ID
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }

    // Check if the session is already canceled or completed
    if (session.status === "canceled") {
      return res.status(400).json({ message: "Session is already canceled." });
    }
    if (session.status === "completed") {
      return res
        .status(400)
        .json({ message: "Completed sessions cannot be canceled." });
    }

    // Update session status to "canceled"
    session.status = "canceled";
    await session.save();

    res.status(200).json({
      message: "Session canceled successfully.",
      session,
    });
  } catch (error) {
    console.error("Error canceling session:", error);
    res.status(500).json({ message: "Failed to cancel session.", error });
  }
};

exports.rescheduleSession = async (req, res) => {
  try {
    const { sessionId } = req.params; // Extract session ID from route parameters
    const { date, time, period, sessionType, price } = req.body; // Extract new session details from request body

    // Find the existing session
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }

    // Check if the session is already completed or canceled
    if (session.status === "completed") {
      return res
        .status(400)
        .json({ message: "Completed sessions cannot be rescheduled." });
    }
    if (session.status === "canceled") {
      return res
        .status(400)
        .json({ message: "Canceled sessions cannot be rescheduled." });
    }

    // Update session attributes only if they are provided; otherwise, keep the existing values
    session.date = date ? new Date(date) : session.date;
    session.time = time || session.time;
    session.period = period || session.period;
    session.sessionType = sessionType || session.sessionType;
    session.price = price !== undefined ? price : session.price;

    session.status = "pending"; // Reset status for rescheduling

    const updatedSession = await session.save();

    return res.status(200).json({
      message: "Session rescheduled successfully.",
      updatedSession,
    });
  } catch (error) {
    console.error("Error rescheduling session:", error);
    res.status(500).json({ message: "Failed to reschedule session.", error });
  }
};

exports.addToWishlist = async (req, res) => {
  const { tutorId } = req.body; // Extract tutor ID from request body
  const { studentId } = req.params; // Extract student ID from route parameters

  try {
    const user = await User.findById(studentId); // Fetch the student user using studentId

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the tutor is already in the wishlist
    if (user.wishlist.includes(tutorId)) {
      return res.status(400).json({ message: "Tutor already in wishlist" });
    }

    // Add the tutor to the wishlist
    user.wishlist.push(tutorId);
    const updatedUser = await user.save();

    // Populate the wishlist with tutor details (optional)
    const populatedWishlist = await User.find({
      _id: { $in: updatedUser.wishlist },
    }).select("name subjects hourlyRate rating");

    return res.status(200).json({
      message: "Tutor added to wishlist",
      wishlist: populatedWishlist, // Return populated wishlist
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({
      message: "Failed to add tutor to wishlist",
      error: error.message,
    });
  }
};

exports.getWishlist = async (req, res) => {
  const { studentId } = req.params;

  try {
    const user = await User.findById(studentId).populate(
      "wishlist",
      "name subjects hourlyRate rating"
    );

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Wishlist fetched successfully",
      wishlist: user.wishlist,
      ok: true,
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { studentId } = req.params;
  const { tutorId } = req.body;

  try {
    const user = await User.findById(studentId);

    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Remove tutor from wishlist
    user.wishlist = user.wishlist.filter((id) => id.toString() !== tutorId);
    const updatedUser = await user.save();

    return res.status(200).json({
      message: "Tutor removed from wishlist",
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ message: "Failed to remove tutor from wishlist" });
  }
};

exports.completeSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.status = "completed";
    await session.save();

    res
      .status(200)
      .json({ message: "Session marked as complete successfully", session });
  } catch (error) {
    console.error("Error completing session:", error);
    res.status(500).json({ message: "Failed to complete session" });
  }
};

exports.getCompletedSessions = async (req, res) => {
  const { studentId } = req.params;

  try {
    const sessions = await Session.find({
      student: studentId,
      status: "completed",
    }).populate("tutor", "name subjects hourlyRate rating");

    return res.status(200).json({
      message: "Completed sessions fetched successfully",
      sessions,
    });
  } catch (error) {
    console.error("Error fetching completed sessions:", error);
    res.status(500).json({ message: "Failed to fetch completed sessions" });
  }
};

exports.submitReview = async (req, res) => {
  const { tutor, student, session, rating, reviewText } = req.body;

  try {
    const review = new Review({
      tutor,
      student,
      session,
      rating,
      reviewText,
    });
    await review.save();

    res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Failed to submit review" });
  }
};
