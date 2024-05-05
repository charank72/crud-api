require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const PORT = 3333;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/api/user", require("./routes/userRoute"));

app.all(`*`, (req, res) => {
  res.status(404).json({ msg: `Requset not found` });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running at @ http://localhost:${PORT}`);
});
