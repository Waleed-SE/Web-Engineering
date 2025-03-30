const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "tutor", "admin"], required: true },
    bio: { type: String },
    subjects: [String], // For tutors
    hourlyRate: { type: Number }, // For tutors
    availability: [
      {
        day: { type: String, required: true }, // e.g., "Monday"
        time: { type: String, required: true }, // e.g., "9-10"
        period: { type: String, enum: ["AM", "PM"], required: true }, // e.g., "AM"
      },
    ], // Weekly schedule, with day, time, and period as individual fields
    wishlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ], // Wishlist for students
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
