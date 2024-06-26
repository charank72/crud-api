const mongoose = require("mongoose");

const connectDb = async () => {
  const url = process.env.MONGO_URL;
  return mongoose
    .connect(url)
    .then((res) => {
      console.log("mongoose connected");
    })
    .catch((err) => console.log(err.message));
};

module.exports = connectDb;
