const mongoose = require("mongoose");

const VerificationRequestSchema = new mongoose.Schema(
  {
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documents: [String], // URLs or file references
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    comments: { type: String }, // Feedback from admins
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "VerificationRequest",
  VerificationRequestSchema
);
