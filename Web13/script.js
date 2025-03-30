const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  //res.writeHead(200, { "Content-Type": "text/plain" });
  // Send the response body
  //res.end("Hello, World!\n");
});

const app = express();

app.listen(3000, () => {
  console.log("Express Running");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {

  console.log(req.method);
  console.log(req.protocol);
  console.log(req.get('host'));
  console.log(req.originalUrl);
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.password);
  next();
  
});

app.get("/about", (req, res) => {
  res.json({
    name: "Waleed",
  });
});
app.post("/login", (req, res) => {
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.http);
  res.send("User Log In Successfully");
});

// app.use((req, res, next) => {
//   console.log("I am lota");
// });

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

