let transaction = {
    transaction_name: { type: String, required: true },
    transaction_type: { type: String, required: true }, //bevéltel/kiadás
    transaction_amount: { type: Number, required: true },
    started_on: { type: Date, required: true },
    finished_on: { type: Date, required: true },
    id: { type: Number, required: true }
};

module.exports = transaction;