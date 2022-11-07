const api = require('express').Router();

api.get('/users', (req, res) => {

    res.json({ msg: "User data" })

});

module.exports = api;