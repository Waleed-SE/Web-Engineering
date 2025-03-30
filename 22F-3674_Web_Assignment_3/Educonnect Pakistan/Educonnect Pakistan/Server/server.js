const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const tutorRoute = require("./routes/tutorRoute");
const studentRoute = require("./routes/studentRoute");
const adminRoute = require("./routes/adminRoute");
const authRoute = require("./routes/authRoute");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/tutors", tutorRoute);
app.use("/api/students", studentRoute);
app.use("/api/admins", adminRoute);
app.use("/api/auth", authRoute);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
