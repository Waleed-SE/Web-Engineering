const User = require("../models/User");

// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the password (this assumes plain text passwords, but you should hash them using bcrypt for security)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with the user details (excluding sensitive information like the password)
    const { password: _, ...userDetails } = user._doc; // Remove the password from the response
    res
      .status(200)
      .json({ message: "Login successful", user: userDetails, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login", success: false, error });
  }
};
