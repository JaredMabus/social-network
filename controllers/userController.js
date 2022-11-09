const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;
module.exports = {
    async getUsers() {
        try {
            let allUsers = await User.find({});
            return allUsers;
        } catch (err) {
            throw err
        }
    },
    async getUserById(id) {
        try {
            let user = await User.findById(ObjectId(id)).populate('friends');
            return user;
        } catch (err) {
            throw err
        }
    },
    async createUser(data) {
        try {
            let newUser = await User.create(data);
            return newUser;
        } catch (err) {
            throw err
        }
    },
    async addFriend(userId, friendId) {
        try {
            let newUser = await User.findByIdAndUpdate(
                ObjectId(userId),
                { $addToSet: { friends: friendId } },
                { new: true }
            )
            return newUser;
        } catch (err) {
            throw err
        }
    },
    async deleteFriend(userId, friendId) {
        try {
            let newUser = await User.findByIdAndUpdate(
                ObjectId(userId),
                { $pull: { friends: friendId } },
                { new: true }
            )
            return newUser;
        } catch (err) {
            throw err
        }
    },
    async updateUser(id, data) {
        try {
            let newUser = await User.findByIdAndUpdate(ObjectId(id), data, { new: true });
            return newUser;
        } catch (err) {
            throw err
        }
    },
    async deleteUser(id) {
        try {
            let deleteUser = await User.findByIdAndDelete(ObjectId(id));
            if (deleteUser) {
                await Thought.deleteMany(
                    { 'username': deleteUser.username }
                );
            }
            return deleteUser;
        } catch (err) {
            throw err
        }
    },
};