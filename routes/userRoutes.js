const express = require('express');
const User = require('../models/userModel')
const app = express();
const middleware = require('../middleware/middleware')();

const userRoute = express.Router();

// 
// Route handler for user signup
// 

// Hash user's password using the middleware when signing up
userRoute.use('/signup', middleware.hashPassword);
userRoute.post('/signup', async (req, res) => {
    // Add the hashed password, then
    // Add the rest of the request body
    const user = new User({ ...req.body, password: req.hashedPassword });
    try {
        await user.save();
        const token = await user.generateJWT();
        res.status(201).json({user, token});
    } catch(error) {
        res.status(400).json({"errorMessage": error.message});
    }
})

// 
// Route handler for user login
// 
userRoute.post('/login', async (req, res) => {
    try {
        // Write code to check db for a user that matches the username, password, and email in the request body
        const user = await User.findByLoginCredentials(req.body);
        const token = await user.generateJWT();
        res.json({ user, token });
    } catch(error) {
        res.status(404).json({"errorMessage": error.message});
    }
})

// 
// Route handler for user logout
// 
userRoute.delete('/logout', middleware.authorizeRequest, async (req, res) => {
    try {
        const { user } = req;
        user.tokens = user.tokens.filter(tokenObject => tokenObject.token !== req.token);
        await user.save();
        res.json();
    } catch(error) {
        res.json({ "errorMessage": error.message })
    }
})

// 
// Route handler to logut user form all devices
// 
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

// 
// Route handler to get user profile
// 

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


// 
// Route handler to delete user account
// 
userRoute.use('/delete', middleware.authorizeRequest);
userRoute.use('/delete', middleware.clearDeletedUserTransactions);
userRoute.delete('/delete', async (req, res) => {
    const { _id } = req.user;
    await req.user.remove();
    res.json(req.user)
})
module.exports = userRoute;