const { User, Thought } = require('../models');


module.exports = {
    async createUser(data) {
        try {
            let newUser = await User.create(data);
            return newUser;
        } catch (err) {
            return err
        }
    },
};