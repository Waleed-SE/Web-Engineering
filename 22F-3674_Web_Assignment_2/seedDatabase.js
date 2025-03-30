const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('./models/admin');
const Student = require('./models/student');
const Course = require('./models/course');

async function seedDatabase() {
    try {
        // Admin Data
        const adminData = JSON.parse(fs.readFileSync(path.join(__dirname, './config/data/admin.json'), 'utf-8'));
        for (const admin of adminData) {
            const hashedPassword = admin.password;
            await Admin.create({ username: admin.username, password: hashedPassword });
        }
        console.log('Admins added successfully.');

        // Student Data
        const studentData = JSON.parse(fs.readFileSync(path.join(__dirname, './config/data/student.json'), 'utf-8'));
        for (const student of studentData) {
            const hashedPassword = student.password;
            await Student.create({
                rollNumber: student.rollNumber,
                username: student.username,
                name: student.name,
                email: student.email,
                password: hashedPassword
            });
        }
        console.log('Students added successfully.');

        // Course Data
        const courseData = JSON.parse(fs.readFileSync(path.join(__dirname, './config/data/course.json'), 'utf-8'));
        for (const course of courseData) {
            // Convert prerequisite course codes to ObjectIds
            const prerequisiteIds = [];
            for (const prerequisiteCode of course.prerequisites) {
                const prerequisiteCourse = await Course.findOne({ courseCode: prerequisiteCode });
                if (prerequisiteCourse) {
                    prerequisiteIds.push(prerequisiteCourse._id);
                } else {
                    console.warn(`Prerequisite course with code ${prerequisiteCode} not found.`);
                }
            }

            // Create course with prerequisites as ObjectIds
            await Course.create({
                courseCode: course.courseCode,
                title: course.title,
                department: course.department,
                level: course.level,
                schedule: course.schedule,
                seatsAvailable: course.seatsAvailable,
                prerequisites: prerequisiteIds
            });
        }
        console.log('Courses added successfully.');
    } catch (error) {
        console.error('Error while seeding the database:', error);
    }
}

module.exports = seedDatabase;
