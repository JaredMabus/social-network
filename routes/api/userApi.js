const api = require('express').Router();
const { user } = require('../../controllers')

api.get('/', async (req, res) => {
    try {
        let allUsers = await user.getUsers();
        res.status(200).json(allUsers)
    } catch (err) {
        console.log(err)
    }
});

api.get('/:id', async (req, res) => {
    try {
        if (req.params.id) {
            let oneUser = await user.getUserById(req.params.id);
            res.status(200).json(oneUser)
        }
    } catch (err) {
        console.log(err)
    }
});

api.post('/', async (req, res) => {
    try {
        if (req.body) {
            let newUser = await user.createUser(req.body);
            res.status(200).json(newUser)
        }
    } catch (err) {
        console.log(err)
    }
});

api.put('/:id', async (req, res) => {
    try {
        if (req.params.id && req.body) {
            let oneUser = await user.updateUser(req.params.id, req.body);
            res.status(200).json(oneUser)
        }
    } catch (err) {
        console.log(err)
    }
});

api.delete('/:id', async (req, res) => {
    try {
        if (req.params.id) {
            let oneUser = await user.deleteUser(req.params.id);
            res.status(200).json(oneUser)
        }
    } catch (err) {
        console.log(err)
    }
});

// Friend Routes
api.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        if (req.params.userId && req.params.friendId) {
            let newFriend = await user.addFriend(req.params.userId, req.params.friendId);
            res.status(200).json(newFriend)
        }
    } catch (err) {
        console.log(err)
    }
});

api.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        if (req.params.userId && req.params.friendId) {
            let deletedFriend = await user.deleteFriend(req.params.userId, req.params.friendId);
            res.status(200).json(deletedFriend)
        }
    } catch (err) {
        console.log(err)
    }
});

module.exports = api;