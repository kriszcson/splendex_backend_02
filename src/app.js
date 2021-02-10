const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const accountRoutes = require('../api/routes/accounts');
const transactionRoutes = require('../api/routes/transactions');
const connectionString = require('../config');


mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Prevent CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET', );
        return res.status(200).json({});
    }
    next();
})

app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to my Bank API!" })
})
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: { message: err.message }
    })
})

module.exports = app;