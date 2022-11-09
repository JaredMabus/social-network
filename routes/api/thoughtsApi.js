const api = require('express').Router();
const { thought } = require('../../controllers')

api.get('/', async (req, res) => {
    try {
        let allThoughts = await thought.getAll();
        res.status(200).json(allThoughts)
    } catch (err) {
        console.log(err)
    }
});

api.get('/:id', async (req, res) => {
    try {
        if (req.params.id) {
            let oneThought = await thought.findById(req.params.id);
            res.status(200).json(oneThought)
        }
    } catch (err) {
        console.log(err)
    }
});

api.post('/', async (req, res) => {
    try {
        if (req.body) {
            let newThought = await thought.createThought(req.body);
            res.status(200).json(newThought)
        }
    } catch (err) {
        console.log(err)
    }
});

api.put('/:id', async (req, res) => {
    try {
        if (req.params.id && req.body) {
            let updateThought = await thought.update(req.params.id, req.body);
            res.status(200).json(updateThought)
        }
    } catch (err) {
        console.log(err)
    }
});

api.delete('/:id', async (req, res) => {
    try {
        if (req.params.id) {
            let deleteThought = await thought.deleteThought(req.params.id);
            res.status(200).json(deleteThought)
        }
    } catch (err) {
        console.log(err)
    }
});

// Reactions routes
api.post('/:toughtId/reactions', async (req, res) => {
    try {
        if (req.params.toughtId && req.body) {
            let newReaction = await thought.createReaction(req.params.toughtId, req.body);
            res.status(200).json(newReaction)
        }
    } catch (err) {
        console.log(err)
    }
});

// Reactions routes
api.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        if (req.params.reactionId) {
            let newReaction = await thought.deleteReaction(req.params.thoughtId, req.params.reactionId);
            res.status(200).json(newReaction)
        }
    } catch (err) {
        console.log(err)
    }
});


module.exports = api;