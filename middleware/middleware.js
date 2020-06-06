const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = function middleware() {
    const authorizeRequest = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const payload = jwt.verify(token, 'secret');
            const user = await User.findOne({ _id: payload._id, 'tokens.token': token })
            console.log(user)
            if(!user) {
                throw new Error('You are not authorized to make this request');
            }
            req.user = user;
            req.token = token;
            next();
        } catch(error) {
            res.status(400).json(error);
        }
        
    }   
    
    return {
        authorizeRequest
    }
    
}