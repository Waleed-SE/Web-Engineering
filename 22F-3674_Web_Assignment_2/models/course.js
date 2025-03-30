const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    department: { type: String, required: true },
    level: { type: Number, required: true },
    schedule: { 
        days: [String], 
        time: String 
    },
    seatsAvailable: { type: Number, required: true },
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Course', CourseSchema);
