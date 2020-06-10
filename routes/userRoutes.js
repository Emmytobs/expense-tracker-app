const express = require('express');
const User = require('../models/userModel')
const userRoute = express.Router();
const app = express();
const middleware = require('../middleware/middleware')();

// Hash user's password using the middleware
userRoute.use('/signup', middleware.hashPassword);
userRoute.post('/signup', async (req, res) => {
    const user = new User({ ...req.body, password: req.hashedPassword });
    try {
        await user.save();
        const token = await user.generateJWT();
        res.status(201).json({user, token});
    } catch(error) {
        res.status(400).json(error);
    }
})

userRoute.post('/login', async (req, res) => {
    // Write code to check db for a user that matches the username, password, and email in the request body
    try {
        const user = await User.findByLoginCredentials(req.body);
        // if(!user) {
        //     // 
        //     // This message is not sent to the client. Work on that
        //     // 
        //     throw new Error('Your login credentials don\'t match our records')
        // }
        const token = await user.generateJWT();
        res.json({ user, token })
    } catch(error) {
        console.log(error)
        res.status(404).send(error)
    }
})

userRoute.delete('/logoutAll', middleware.authorizeRequest, async (req, res) => {
    try {
        const { user } = req
        user.tokens = [];
        await user.save();
        res.json();
    } catch(error) {
        res.status(404).send(error);
    }
})

// Authenticate the user using middleware
userRoute.use('/profile', middleware.authorizeRequest);
userRoute.get('/profile', (req, res) => {
    try { 
        const { user, token } = req;
        res.json({ user, token });
    } catch(error) {
        res.status(400).json(error);
    }
    // const users = await User.find({});
    // res.json(users);
})

module.exports = userRoute;