const User = require("../models/User");

// Create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, role, bio } = req.body;

    if (role !== "admin") {
      return res.status(400).json({ message: "Role must be 'admin'" });
    }

    const newAdmin = new User({
      name,
      email,
      password,
      role,
      bio,
    });

    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  }
};

// Get an admin by ID
exports.getAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id)
      .where("role")
      .equals("admin");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin", error });
  }
};

// Update an admin
exports.updateAdmin = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;

    const admin = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, bio },
      { new: true }
    )
      .where("role")
      .equals("admin");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error updating admin", error });
  }
};

// Delete an admin
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findByIdAndDelete(req.params.id)
      .where("role")
      .equals("admin");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin", error });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
};
