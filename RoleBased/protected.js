const express = require("express");
const { authenticateToken, authorizeRole } = require("./auth");

const router = express.Router();
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

router.get("/admin", authenticateToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome to the admin page", user: req.user });
});

module.exports = router;
