const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const helmet = require('helmet');
const {
  verifyToken,
  verifyAdmin,
  verifyStudent,
} = require("./middleware/authMiddleware");
const seedDatabase = require("./seedDatabase");

const studentRoute = require("./routes/studentRoute");
const adminRoute = require("./routes/adminRoute");
const authRoute = require("./routes/authRoute");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB Connected");
    if (process.env.SEED_DB === "true") {
      seedDatabase();
    }
  })
  .catch((err) => console.log(err));

// Set View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serve Static Files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/students", studentRoute);
app.use("/admin", adminRoute);
app.use("/auth", authRoute);

// Corrected Rendering
app.get("/", (req, res) => {
  res.render("index"); // ✅ Corrected path
});

app.get("/student/dashboard", verifyToken, verifyStudent, (req, res) => {
  res.render("student/dashboard", { user: req.user });
});

app.get("/admin/dashboard", verifyToken, verifyAdmin, (req, res) => {
  res.render("admin/dashboard", { user: req.user });
});

app.get("/auth/login", (req, res) => {
  res.render("auth/login"); // ✅ Render login.ejs page
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
