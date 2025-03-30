const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true, // Date when the session is scheduled
    },
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true, // Day of the week (matches tutor availability)
    },
    time: {
      type: String,
      required: true, // Time slot e.g., "9-10"
    },
    period: {
      type: String,
      enum: ["AM", "PM"],
      required: true, // Time period (AM or PM, matches tutor availability)
    },
    sessionType: {
      type: String,
      enum: ["online", "in-person"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true, // Price of the session
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", SessionSchema);
