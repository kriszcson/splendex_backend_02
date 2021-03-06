const express = require('express');
const router = express.Router();

const Transaction = require('../../src/schemas/transactionSchema');


router.get('/:type/:id/:from?/:to?', (req, res, next) => {
    const type = req.params.type;
    const id = req.params.id;
    const dateFrom = new Date(req.params.from);
    const dateTo = new Date(req.params.to);



    Transaction.find({ account: id })
        .exec()
        .then(docs => {
            if ((!req.params.from || !req.params.to) && !(!req.params.from && !req.params.to)) {
                return res.status(500).json({
                    message: "The start, or the end of the period is missing!"
                })
            }
            let responseInPeriod = [];
            let expenseInPeriod = 0;
            for (let doc of docs) {
                if (doc.transaction_type === type) {
                    //üres time-routok esetében az összes kiadás
                    if (!req.params.from && !req.params.to) {
                        responseInPeriod.push(doc);
                        expenseInPeriod += doc.transaction_amount;
                    } else {
                        if (dateFrom.getTime() < doc.finished_on.getTime() &&
                            doc.finished_on.getTime() < dateTo.getTime()) {
                            responseInPeriod.push(doc);
                            expenseInPeriod += doc.transaction_amount;
                        }
                    }
                }
            }
            res.status(200).json({
                count: responseInPeriod.length,
                all_expense: expenseInPeriod,
                expenses: responseInPeriod
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
})

router.get('/:type', (req, res, next) => {
    const type = req.params.type;
    Transaction.find()
        .exec()
        .then(docs => {
            let responseInPeriod = [];
            let expenseInPeriod = 0;
            for (let doc of docs) {
                if (doc.transaction_type === type) {
                    console.log(doc)
                    responseInPeriod.push(doc);
                    expenseInPeriod += doc.transaction_amount;
                }
            }
            res.status(200).json({
                count: responseInPeriod.length,
                all_expense: expenseInPeriod,
                expenses: responseInPeriod
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
})


router.get('/', (req, res, next) => {
    res.status(500).json({
        message: "Please add the type of the report!"
    })
});



module.exports = router;