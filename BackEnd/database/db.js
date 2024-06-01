const mongoose = require("mongoose");

const MongodbURI =
  "mongodb+srv://piyushpise0333:cjUGlIKu3TnDmos0@authentication.q6c3rfa.mongodb.net/?retryWrites=true&w=majority&appName=Authentication";

mongoose
  .connect(MongodbURI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = mongoose;
