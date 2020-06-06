const express = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const userRoute = new express.Router();
const app = express();
const { authorizeRequest } = require('../middleware/middleware')();


userRoute.post('/signup', async (req, res) => {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new User({ ...req.body, password: hashedPassword });
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
        res.status(404).json(error)
    }
})

userRoute.get('/profile', authorizeRequest, (req, res) => {
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