const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {userRouter} = require('./routes/user');
const {transactionRouter} = require('./routes/transaction');
const cors = require('cors');
const path = require('path');

app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(__dirname, './client/build')));

app.use((err, req, res, next) => {
    console.warn(err.stack);
    res.status(500).json({
        message: err.message
    });
});

app.use('/users', userRouter);

app.use('/transactions', transactionRouter);

if (process.env.NODE_ENV == "production") {
    app.use('*', (req, res) => res.sendFile(path.join(__dirname, './client/build', "index.html")));
    }

const PORT = process.env.PORT || 4567;

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));