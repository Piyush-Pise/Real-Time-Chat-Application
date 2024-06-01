const mongoose = require('./db');

const AuthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  rooms: [{roomId : String, connections: [String]}],
});

const ActiveUsersSchema = new mongoose.Schema({
  activeUsers: [{userId: String, socketId: String}],
});

module.exports = {AuthSchema, UserSchema, ActiveUsersSchema};