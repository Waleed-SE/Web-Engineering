const User = require("../models/User");

// Create a new tutor
exports.createTutor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      bio,
      subjects,
      hourlyRate,
      availability,
    } = req.body;

    if (role !== "tutor") {
      return res.status(400).json({ message: "Role must be 'tutor'" });
    }

    const newTutor = new User({
      name,
      email,
      password,
      role,
      bio,
      subjects,
      hourlyRate,
      availability,
    });

    await newTutor.save();
    res.status(201).json(newTutor);
  } catch (error) {
    res.status(500).json({ message: "Error creating tutor", error });
  }
};

// Get a tutor by ID
exports.getTutor = async (req, res) => {
  try {
    const tutor = await User.findById(req.params.id)
      .where("role")
      .equals("tutor");
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tutor", error });
  }
};

// Update a tutor
exports.updateTutor = async (req, res) => {
  try {
    const { name, email, password, bio, subjects, hourlyRate, availability } =
      req.body;

    const tutor = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, bio, subjects, hourlyRate, availability },
      { new: true }
    )
      .where("role")
      .equals("tutor");

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    res.status(200).json(tutor);
  } catch (error) {
    res.status(500).json({ message: "Error updating tutor", error });
  }
};

// Delete a tutor
exports.deleteTutor = async (req, res) => {
  try {
    const tutor = await User.findByIdAndDelete(req.params.id)
      .where("role")
      .equals("tutor");
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.status(200).json({ message: "Tutor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tutor", error });
  }
};

// Get all tutors
exports.getAllTutors = async (req, res) => {
  try {
    const { subject, rating, day, time, period, minPrice, maxPrice } =
      req.query;

    // Base query
    const query = { role: "tutor" };

    if (subject) query.subjects = subject;
    if (rating) query.rating = { $gte: parseFloat(rating) };
    if (day || time || period) {
      query.availability = {
        $elemMatch: {
          ...(day && { day }),
          ...(time && { time }),
          ...(period && { period }),
        },
      };
    }
    if (minPrice || maxPrice) {
      query.hourlyRate = {
        ...(minPrice && { $gte: parseFloat(minPrice) }),
        ...(maxPrice && { $lte: parseFloat(maxPrice) }),
      };
    }

    const tutors = await User.find(query);
    res.status(200).json({ tutors });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tutors", error });
  }
};

const Session = require("../models/Session");

exports.getTutorSessions = async (req, res) => {
  try {
    const { tutorId } = req.params; // Extract tutor ID from route parameters
    const { status, date, student } = req.query; // Optional query parameters for filtering

    // Build a dynamic query object
    const query = { tutor: tutorId };

    // Add optional filters
    if (status) query.status = status; // Filter by session status (e.g., "pending")
    if (date) query.date = { $eq: new Date(date) }; // Filter by specific date
    if (student) query.student = student; // Filter by student ID

    // Fetch sessions based on the query
    const sessions = await Session.find(query)
      .populate("student", "name email") // Populate student details (optional)
      .populate("tutor", "name email") // Populate tutor details (optional)
      .sort({ date: 1, time: 1 }); // Sort by date and time

    res.status(200).json({
      message: "Sessions fetched successfully",
      sessions,
    });
  } catch (error) {
    console.error("Error fetching tutor sessions:", error);
    res.status(500).json({ message: "Error fetching tutor sessions", error });
  }
};

exports.getBookedSlots = async (req, res) => {
  try {
    const { tutorId } = req.params; // Extract tutor ID from route parameters
    const { date } = req.query; // Optional date for filtering

    // Build query object
    const query = { tutor: tutorId, status: { $in: ["pending", "completed"] } };
    if (date) query.date = { $eq: new Date(date) }; // Filter by specific date

    // Fetch sessions based on query
    const bookedSessions = await Session.find(query)
      .populate("student", "name email") // Optional: Populate student details
      .sort({ time: 1 }); // Sort by time

    res.status(200).json({
      message: "Booked slots fetched successfully",
      bookedSessions,
    });
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    res.status(500).json({ message: "Error fetching booked slots", error });
  }
};
