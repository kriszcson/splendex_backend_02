const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Account = require('../../src/schemas/accountSchema.js');

router.get('/', (req, res) => {
    Account.find()
        .exec()
        .then((docs => {
            console.log(docs);
            res.status(201).json(docs);
        }))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

router.post('/', (req, res) => {
    const account = new Account({
        _id: new mongoose.Types.ObjectId(),
        account_holder_name: req.body.account_holder_name,
        account_number: req.body.account_number,
        starting_balance: req.body.starting_balance,
        created_on: req.body.created_on,
        expires_in: req.body.expires_in
    });
    account
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /accounts",
                createdAccount: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Account.findById(id)
        .exec()
        .then(doc => {
            console.log("FROM DATABASE:" + doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Account.updateOne({ _id: id }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({ result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Account.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

})

module.exports = router;