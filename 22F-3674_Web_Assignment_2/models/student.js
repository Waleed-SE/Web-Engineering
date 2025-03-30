const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StudentSchema = new mongoose.Schema({
    rollNumber: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true }, // Added username field
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registeredCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Currently registered courses
    passedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Courses the student has passed
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving to database
StudentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Student', StudentSchema);
