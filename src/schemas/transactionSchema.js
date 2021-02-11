const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    transaction_name: { type: String, required: true },
    transaction_type: { type: String, required: true }, //bevéltel/kiadás
    transaction_amount: { type: Number, required: true },
    started_on: { type: Date, required: true },
    finished_on: { type: Date, required: true },
})

module.exports = mongoose.model('Transaction', transactionSchema)