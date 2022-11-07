const mongoose = require("mongoose")
const { Thought } = require('./index');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: ['/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/', "not valid email"]
  },
  thoughts: [ObjectId()]
})


// TO-DO: Create a virtual "friendCount" to get length of user's friends array


const User = mongoose.model("User", userSchema)

module.exports = User