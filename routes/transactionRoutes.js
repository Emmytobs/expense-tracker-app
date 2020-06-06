const express = require('express');
const { authorizeRequest } = require('../middleware/middleware')()
const Transaction = require('../models/transactionModel');
const transactionRoutes = new express.Router();

transactionRoutes.post('/add', authorizeRequest, async (req, res) => {
    const { title, amount } = req.body;
    if(typeof amount === 'string') {
        Number(amount);
    }
    const owner = req.user._id;
    const transaction = new Transaction({ title, amount, owner });
    await transaction.save()
    res.status(201).json(transaction)
});

module.exports = transactionRoutes;