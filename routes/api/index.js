const api = require('express').Router();
const userApi = require('./userApi');
const thoughtApi = require('./thoughtsApi');

api.use('/users', userApi);
api.use('/thoughts', thoughtApi);

module.exports = api;