const express = require('express');
const app = express();
const accountRoutes = require('../api/routes/accounts');
const transactionRoutes = require('../api/routes/transactions');

//middleware
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to my Bank API!" })
})
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status(404);
    next(error);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: { message: err.message }
    })
})

module.exports = app;