const api = require('express').Router();

api.get('/friends', (req, res) => {

    res.json({ msg: "friends data" })

});

module.exports = api;