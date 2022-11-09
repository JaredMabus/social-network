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
            let oneUser = await user.createUser(req.body);
            res.status(200).json(oneUser)
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

module.exports = api;