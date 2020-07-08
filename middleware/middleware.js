const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const bcrypt = require('bcryptjs')

module.exports = function middleware() {
    const authorizeRequest = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const payload = jwt.verify(token, 'secret');
            const user = await User.findOne({ _id: payload._id, 'tokens.token': token })

            if(!user) {
                throw new Error('You are not authorized to make this request');
            }
            
            req.user = user;
            req.token = token;
            next();
        } catch(error) {
            res.status(400).json(error.message);            
        }
        
    }  
    
    const hashPassword = async (req, res, next) => {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        req.hashedPassword = hashedPassword;
        next();
    }

    const clearDeletedUserTransactions = async (req, res, next) => {
        try {
            await Transaction.deleteMany({ owner: req.user._id });
            console.log(req.user._id)    
            next()
        } catch(error) {
            res.status(500).json(error);
        }
    }
    
    return {
        authorizeRequest,
        hashPassword,
        clearDeletedUserTransactions
    }
    
}