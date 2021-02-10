const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Account = require('../../src/schemas/accountSchema.js');

router.get('/', (req, res) => {
    Account.find()
        .select('account_holder_name account_number starting_balance created_on expires_in')
        .exec()
        .then((docs => {
            const response = {
                count: docs.length,
                account: docs.map(doc => {
                    return {
                        _id: doc._id,
                        account_holder_name: doc.account_holder_name,
                        account_number: doc.account_number,
                        starting_balance: doc.starting_balance,
                        created_on: doc.created_on,
                        expires_in: doc.expires_in,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/accounts/${doc._id}`
                        }
                    }
                })
            }
            res.status(201).json(response);
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
                message: "Account succesfully created!",
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
        .select('account_holder_name account_number starting_balance created_on expires_in')
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