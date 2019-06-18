const express = require('express');
const creditCardRouter = express.Router();
const {CreditCard, User} = require('../models/index');

creditCardRouter.get('/:id', async (req, res) => {
    const creditCards = await CreditCard.findAll({
        where: {
            user_id: req.params.id
        }
    });

    res.json(creditCards);
});

creditCardRouter.post('/:userid/create', async (req, res) => {
    const newCreditCard = await CreditCard.create(req.body);

    const user = await User.findByPk(req.params.userid);

    newCreditCard.setUser(user);

    res.json({newCreditCard});
});

creditCardRouter.put('/:userid/:id', async (req, res) => {
    const creditCard = await CreditCard.update(req.body, {
        where: {
            user_id: req.params.userid,
            id: req.params.id
        }
    });

    res.json({creditCard});
});

creditCardRouter.delete('/:id', async (req, res) => {
    const creditCard = await CreditCard.findByPk(req.params.id);
    creditCard.destroy();
});

module.exports = {
    creditCardRouter
}