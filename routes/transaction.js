const express = require('express');
const transactionRouter = express.Router();
const {Transaction, CreditCard} = require('../models/index');

transactionRouter.get('/:userid', async (req, res) => {
    const userCards = await CreditCard.findAll({
        where: {
            userId: req.params.userid
        }
    });

    const allTransactions = await Transaction.findAll({
        where: {
            creditCardId: userCards.id
        } 
    });

    res.json(allTransactions);
});

transactionRouter.create('/:userid/:creditcardid/create', async (req, res) => {
    const userCards = await CreditCard.findAll({
        where: {
            userId: req.params.userid
        }
    });

    const newTransaction = await Transaction.create(req.body, {
        where: {
            creditCardId: userCards.id
        }
    });

    res.json({newTransaction});
});

transactionRouter.delete('/:userid/:creditcardid/:id', async (req, res) => {
    const userCards = await CreditCard.findAll({
        where: {
            userId: req.params.userid
        }
    });

    const transaction = await Transaction.findAll({
        where: {
            creditCardId: req.params.creditcardid,
            id: req.params.id
        }
    });

    transaction.destroy();
});

module.exports = {
    transactionRouter
}