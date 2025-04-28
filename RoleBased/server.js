const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("./users");
const protectedRoutes = require("./protected");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", protectedRoutes);

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});

app.get("/", (req, res) => {
  Token = req.headers.authorization;
  jwt.decode(Token, process.env.JWT_SECRET, (err, decoded) => {
    res.json({ decoded });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
