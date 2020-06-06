const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = Schema({
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
    owner: {

    }
})

const Transaction = mongoose.model
('Transaction', transactionSchema);
module.exports = Transaction;