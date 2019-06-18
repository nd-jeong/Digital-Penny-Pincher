const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {userRouter} = require('./routes/user');
const {creditCardRouter} = require('./routes/creditCard');
const {transactionRouter} = require('./routes/transaction');

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.warn(err.stack);
    res.status(500).json({
        message: err.message
    });
});

app.use('/users', userRouter);

app.use('/creditcards', creditCardRouter);

app.use('/transactions', transactionRouter);

const PORT = process.env.PORT || 4567;

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));