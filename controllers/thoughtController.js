const { Thought, User } = require('../models');
const { ObjectId } = require('mongoose').Types;
module.exports = {
    async getAll() {
        try {
            let allThoughts = await Thought.find({});
            return allThoughts;
        } catch (err) {
            throw err
        }
    },

    async findById(id) {
        try {
            let thought = await Thought.findById(ObjectId(id))
            return thought;
        } catch (err) {
            throw err
        }
    },

    async createThought(data) {
        try {
            let newThought = await Thought.create(data);
            if (newThought) {
                await User.findOneAndUpdate(
                    { username: data.username },
                    { $addToSet: { thoughts: ObjectId(newThought.id) } },
                    { new: true }
                )
            }
            return newThought;
        } catch (err) {
            throw err
        }
    },

    async update(id, data) {
        try {
            let updateThought = await Thought.findByIdAndUpdate(ObjectId(id), data, { new: true });
            return updateThought;
        } catch (err) {
            throw err
        }
    },

    async deleteThought(id) {
        try {
            let deleteThought = await Thought.findByIdAndDelete(ObjectId(id));
            return deleteThought;
        } catch (err) {
            throw err
        }
    },

    // Reaction Controllers
    async createReaction(toughtId, data) {
        try {
            let newReaction = await Thought.findOneAndUpdate(
                ObjectId(toughtId),
                { $addToSet: { reactions: data } },
                { new: true }
            )
            return newReaction;
        } catch (err) {
            throw err
        }
    },
    async deleteReaction(thoughtId, reactionId) {
        try {
            let deleteReaction = await Thought.findOneAndUpdate(
                { _id: ObjectId(thoughtId) },
                { $pull: { reactions: { _id: reactionId } } },
                { new: true }
            )
            return deleteReaction;
        } catch (err) {
            throw err
        }
    },
};