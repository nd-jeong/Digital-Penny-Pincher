const express = require('express');
const creditCardRouter = express.Router();
const {CreditCard} = require('../models/index');

creditCardRouter.get('/:id', async (req, res) => {
    const creditCards = await CreditCard.findAll({
        where: {
            userId = req.params.id
        }
    });

    res.json(creditCards);
});

creditCardRouter.post('/:id/create', async (req, res) => {
    const newCreditCard = await CreditCard.create(req.body);

    res.json({newCreditCard});
});

creditCardRouter.put('/:userid/:id', async (req, res) => {
    const creditCard = await CreditCard.update(req.body, {
        where: {
            userId: req.params.userid,
            id: req.params.id
        }
    });

    res.json({creditCard});
});

creditCardRouter.delete('/:userid/:id', async (req, res) => {
    const creditCard = await CreditCard.findByPk(req.params.id);
    creditCard.destroy();
});

module.exports = {
    creditCardRouter
}