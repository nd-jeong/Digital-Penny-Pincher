const express = require('express');
const userRouter = express.Router();
const {User} = require('../models/index');

userRouter.get('/', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
});

userRouter.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    res.json(user);
});

userRouter.post('/create', async (req, res) => {
    const newUser = await User.create(req.body);

    res.json(newUser);
});

userRouter.put('/:id', async (req, res) => {
    const response = await User.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.json({response});
});

module.exports = {
    userRouter
}