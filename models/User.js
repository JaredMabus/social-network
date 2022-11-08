const { Schema, Types, model } = require("mongoose")

const userSchema = new Schema({
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
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "not valid email"]
  },
  thoughts: [{ type: Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: Types.ObjectId, ref: 'User' }],
}, {
  toJSON: {
    virtuals: true,
  },
})


// TO-DO: Create a virtual "friendCount" to get length of user's friends array
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model("User", userSchema)

module.exports = User