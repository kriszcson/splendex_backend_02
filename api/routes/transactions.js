const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Transaction = require('../../src/schemas/transactionSchema');
const Account = require('../../src/schemas/accountSchema');

router.get('/', (req, res, next) => {
    Transaction
        .find()
        .select('account transaction_name transaction_type transaction_amount started_on finished_on')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                transactions: docs.map(doc => {
                    console.log(doc);
                    return {
                        _id: doc._id,
                        account: doc.account,
                        transaction_name: doc.transaction_name,
                        transaction_type: doc.transaction_type, //bevéltel/kiadás
                        transaction_amount: doc.transaction_amount,
                        started_on: doc.started_on,
                        finished_on: doc.finished_on,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/transactions/${doc._id }`
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });

});


router.post('/', (req, res) => {
    let accountOfTransaction;
    Account.findById(req.body.account)
        .then(account => {
            if (!account) {
                return res.status(404).json({
                    message: "Account not find!"
                })
            }
            accountBalancing(account, req.body.transaction_amount);
            accountOfTransaction = account;
            const transaction = new Transaction({
                _id: mongoose.Types.ObjectId(),
                account: req.body.account, //account _id
                transaction_name: req.body.transaction_name,
                transaction_type: req.body.transaction_type, //bevéltel/kiadás
                transaction_amount: req.body.transaction_amount,
                started_on: req.body.started_on,
                finished_on: req.body.finished_on,
            });
            return transaction
                .save()
        })
        .then(result => {
            res.status(201).json({
                transaction: result,
                account_balance_before: accountOfTransaction.starting_balance - req.body.transaction_amount,
                account_balance_after: (accountOfTransaction.starting_balance)
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

function accountBalancing(account, amount) {
    const id = account._id;
    const updateOps = {};
    Account.updateOne({ _id: id }, {
            starting_balance: account.starting_balance += amount
        })
        .exec()
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

module.exports = router;

//60250b7398d38d1d60afacb9