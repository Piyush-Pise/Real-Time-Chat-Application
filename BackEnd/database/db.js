const mongoose = require("mongoose");

const MongodbURI =
  "Your MongoDB URI";

mongoose
  .connect(MongodbURI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = mongoose;
