const express = require('express');
const transactionRouter = express.Router();
const {Transaction, User} = require('../models/index');

transactionRouter.get('/:userid', async (req, res) => {
    const allTransactions = await Transaction.findAll({
        where: {
            user_id: req.params.userid
        } 
    });

    res.json(allTransactions);
});

transactionRouter.get('/:userid/:transactiontype', async (req, res) => {
    const allTransactionsType = await Transaction.findAll({
        where: {
            user_id: req.params.userid,
            type: req.params.transactiontype
        }
    });

    res.json(allTransactionsType);
});

transactionRouter.get('/:userid/find/:transactionid', async (req, res) => {
    const singleTransaction = await Transaction.findOne({
        where: {
            id: req.params.transactionid
        }
    });

    res.json(singleTransaction);
});

transactionRouter.put('/:transactionid', async (req, res) => {
    const result = await Transaction.update(req.body, {
        where: {
            id: req.params.transactionid
        }
    })

    res.json({result});
});

transactionRouter.post('/:userid/create', async (req, res) => {
    const newTransaction = await Transaction.create(req.body);

    const user = await User.findByPk(req.params.userid);
    
    newTransaction.setUser(user);
    
    res.json({newTransaction});
});

transactionRouter.delete('/:userid/delete/:id', async (req, res) => {
    const transaction = await Transaction.findByPk(req.params.id);

    transaction.destroy();

    res.json(transaction);
});

module.exports = {
    transactionRouter
}