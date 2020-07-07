const express = require('express');
const { authorizeRequest } = require('../middleware/middleware')()
const Transaction = require('../models/transactionModel');
const transactionRoutes = express.Router();

// Create a new transaction
transactionRoutes.post('/transaction', authorizeRequest, async (req, res) => {
    const { title, amount } = req.body;
    if(typeof amount === 'string') {
        Number(amount);
    }
    const owner = req.user._id;
    const transaction = new Transaction({
        title,
        amount,
        isExpense: amount < 0 ? true : false,
        owner
    });
    await transaction.save()
    res.status(201).json(transaction)
});

// Get all transactions
transactionRoutes.get('/transactions', authorizeRequest, async (req, res) => {
    // GET /transactions?isExpense=true&amount=10&sortBy=createdAt_-1&limit=5&skip=0
    const { isExpense, amount, limit = 10, skip = 0, sortBy } = req.query;

    let match = {};
    let sort = {
    }
    
    if(isExpense) {
        match = {...match, isExpense}
    } 
    if(amount) {
        match = {...match, amount}
    }
    if(sortBy) {
        const [propertyToSort, orderToSort] =  sortBy.split('_');
        sort[propertyToSort] = orderToSort === '-1' ? -1 : 1;
    }
    try {
        await req.user.populate({
            path: 'transactions',
            match,
            options: {
                limit: parseInt(limit),
                skip: parseInt(skip),
                sort
            }
        }).execPopulate();
        res.json(req.user.transactions);
    } catch(error) {
        res.status(500).json(error);
    }
})

// Get a specific transaction
transactionRoutes.get('/transaction/:id', authorizeRequest, async (req, res) => {
    const { id: _id } = req.params;

    try {
        const transaction = await Transaction.findOne({ _id, owner: req.user._id });
        if(!transaction) {
            return res.status(404).json({ error: 'No transaction found' });
        }
        res.json(transaction)
    } catch(error) {
        res.status(500).json(error);
    }
})

// Delete a transaction
transactionRoutes.delete('/transaction/:id', authorizeRequest, async (req, res) => {
    const { id: _id } = req.params;

    try {
        const transaction = await Transaction.findOneAndDelete({ _id, owner: req.user._id });
        if(!transaction) return res.status(404).json({ error: "No transaction found" });
        res.json(transaction);  
    } catch(error) {
        res.status(500).json(error);
    }
})

module.exports = transactionRoutes;