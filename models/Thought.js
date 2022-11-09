const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema({
  type: Types.ObjectId,
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
})

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
}, {
  toJSON: {
    virtuals: true,
  },
})

// TO-DO: Create getter function to format date
thoughtSchema
  .virtual('formatDate')
  .get(function () {
    return this.createAt;
  });

// TO-DO: Create a virtual "reactionCount" to get length of thought's reactions array
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model("Thought", thoughtSchema)

module.exports = Thought;