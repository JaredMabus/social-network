const api = require('express').Router();
const userApi = require('./userApi');
const friendApi = require('./userApi');
const thoughtApi = require('./userApi');

api.use('/user', userApi);
api.use('/friends', friendApi);
api.use('/thoughts', thoughtApi);



module.exports = api;