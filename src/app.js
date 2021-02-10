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

app.get('*', (req, res) => {
    res.status(404).json({ message: "(404) Site not found!" });
})

module.exports = app;