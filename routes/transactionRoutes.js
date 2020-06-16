const express = require('express');
const { authorizeRequest } = require('../middleware/middleware')()
const Transaction = require('../models/transactionModel');
const transactionRoutes = express.Router();

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

transactionRoutes.get('/transactions', authorizeRequest, async (req, res) => {
    try {
        await req.user.populate('transactions').execPopulate();
        res.json(req.user.transactions);
    } catch(error) {
        res.status(500).json(error);
    }
})

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

module.exports = transactionRoutes;