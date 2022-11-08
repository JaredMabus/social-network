const { User, Thought } = require('../models');
const db = require('../config/connection');
const userData = require('./userData.json');
const thoughtData = require('./thoughtData.json');
const { Types } = require('mongoose')




const seedDatabase = async () => {
    try {
        db.once('open', async () => {
            const hasUserData = await User.find({});
            const hasThoughts = await Thought.find({});

            // Clear User and Thought data if exist
            if (hasUserData.length > 0 && hasThoughts.length > 0) {
                await User.deleteMany({});
                await Thought.deleteMany({});
            }

            await User.insertMany(userData);
            await Thought.insertMany(thoughtData);

            // Get users and add 2 random friends from the User collection
            const friendUserData = await User.find({});
            const userDataWithFriends = [];

            // append two friends to each user object
            for await (let user of friendUserData) {
                let friendsData = await User.aggregate([{ $sample: { size: 2 } }]);

                friendsData.forEach(friend => {
                    user.friends.push(Types.ObjectId(friend._id))
                });
                userDataWithFriends.push(user);
            };

            // update each user in the User collection
            for await (let user of userDataWithFriends) {
                await User.updateOne({ _id: Types.ObjectId(user._id) }, {
                    $push:
                    {
                        friends: {
                            $each: user.friends
                        }
                    }
                })
            };

            console.log("Database successfully seeded");
            process.exit(0);
        })
    } catch (err) {
        throw err
    }
};

seedDatabase();