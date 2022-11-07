const { Schema, model, Types } = require("mongoose");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  userName: {
    type: String,
    required: true
  },
  reactions: [{
    type: Types.ObjectId(),
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now()
    },
  }]
})

// TO-DO: Create getter function to format date

// TO-DO: Create a virtual "reactionCount" to get length of thought's reactions array

const Thought = model("Thought", thoughtSchema)

module.exports = Thought