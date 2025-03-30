const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  reportType: { type: String, required: true }, // e.g., 'session', 'user'
  data: mongoose.Schema.Types.Mixed, // Flexible field for report data
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin generating the report
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", ReportSchema);
