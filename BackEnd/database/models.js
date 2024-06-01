const mongoose = require("./db");
const { AuthSchema, UserSchema } = require("./schemas");

const AuthDB = mongoose.model("Real Time Chat App Authentication", AuthSchema);
const UserDB = mongoose.model("Real Time Chat App User Data", UserSchema);

module.exports = { AuthDB, UserDB };