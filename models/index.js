const sequelize = require('sequelize');

const db = new sequelize({
    database: "dpp_db",
    dialect: "postgres",
    define: {
        underscored: true,
        returning: true,
        freezeTableName: true
    }
});

const User = db.define("user", {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: sequelize.STRING,
        allowNull: true,
        unique: true
    }
});

const CreditCard = db.define("creditCard", {
    number: {
        type: sequelize.STRING,
        unique: true
    },
    expiration: sequelize.STRING,
    ccv: sequelize.STRING,
    balance: sequelize.INTEGER,
    limit: sequelize.INTEGER,
});

const Transaction = db.define("transaction", {
    amount: sequelize.DECIMAL(5,2),
    date: sequelize.DATEONLY,
    time: sequelize.TIME,
    type: sequelize.STRING
});

User.hasMany(CreditCard);
CreditCard.belongsTo(User);
CreditCard.hasMany(Transaction);
Transaction.belongsTo(CreditCard);

module.exports = {
    db,
    User,
    CreditCard,
    Transaction
};