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

    res.json(allTransactionsType)
})

transactionRouter.post('/:userid/create', async (req, res) => {
    const newTransaction = await Transaction.create(req.body);

    const user = await User.findByPk(req.params.userid);
    
    newTransaction.setUser(user);
    
    res.json({newTransaction});
});

transactionRouter.delete('/:userid/:id', async (req, res) => {
    const transaction = await Transaction.findAll({
        where: {
            id: req.params.id,
            user_id: req.params.userid
        }
    });

    transaction.destroy();
});

module.exports = {
    transactionRouter
}