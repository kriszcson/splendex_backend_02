const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    account_holder_name: { type: String, required: true },
    account_number: { type: Number, required: true },
    starting_balance: { type: Number, required: true },
    created_on: { type: Date, required: true },
    expires_in: { type: Date, required: true }
})

module.exports = mongoose.model('Account', accountSchema);