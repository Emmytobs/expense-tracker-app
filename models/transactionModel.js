const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        // The amount absolutely must be formatted to a number from react
        type: Number,
        required: true,
        trim: true,
    },
    isExpense: { 
        type: Boolean,
    },
    owner: {}
}, {
    timestamps: true
})

const Transaction = mongoose.model
('Transaction', transactionSchema);
module.exports = Transaction;