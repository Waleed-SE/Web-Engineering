const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Admin = require('../models/admin');

exports.studentLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const student = await Student.findOne({ username });
        if (!student || !(await bcrypt.compare(password, student.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        req.session.token = token;  // ✅ Store token in session
        res.json({ message: "Login successful", token, id:student._id });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        req.session.token = token;  // ✅ Store token in session
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};