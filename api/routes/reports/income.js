const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/:id/:from/:to', (req, res, next) => {
    const id = req.params.id;
    const dateFrom = req.params.from;
    const dateTo = req.params.to;

    Account.findById(id)
        .select('account_holder_name account_number starting_balance created_on expires_in')
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc);
            } else {
                res.status(404).json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
})


module.exports = router;