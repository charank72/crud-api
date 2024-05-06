require("dotenv").config();
const express = require("express");

const cors = require("cors");
const path = require("path");
const connectDB = require("./db/connect");
const PORT = 3333;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/api/user", require("./routes/userRoute"));
app.use(express.static("public"));
app.use(express.static("build"));

app.use(express.static(path.resolve(__dirname, "build")));
app.use(`/*`, (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
app.listen(PORT, () => {
  connectDB();
  console.log(`server is running at @ http://localhost:${PORT}`);
});
