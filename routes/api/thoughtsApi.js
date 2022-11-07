const api = require('express').Router();

api.get('/thoughts', (req, res) => {

    res.json({ msg: "thought data" })

});

module.exports = api;