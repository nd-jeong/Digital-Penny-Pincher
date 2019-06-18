const express = require('express');
const transactionRouter = express.Router();
const {Transaction, CreditCard} = require('../models/index');

transactionRouter.get('/:userid', async (req, res) => {
    const userCards = await CreditCard.findOne({
        where: {
            user_id: req.params.userid
        }
    });

    const allTransactions = await Transaction.findAll({
        where: {
            credit_card_id: userCards.id
        } 
    });

    res.json(allTransactions);
});

transactionRouter.post('/:creditcardid/create', async (req, res) => {
    const newTransaction = await Transaction.create(req.body);

    const creditCard = await CreditCard.findByPk(req.params.creditcardid);
    
    newTransaction.setCreditCard(creditCard);
    
    res.json({newTransaction});
});

transactionRouter.delete('/:userid/:creditcardid/', async (req, res) => {
    const transaction = await Transaction.findAll({
        where: {
            credit_card_id: req.params.creditcardid,
            user_id: req.params.userid
        }
    });

    transaction.destroy();
});

module.exports = {
    transactionRouter
}