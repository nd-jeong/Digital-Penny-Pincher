const sequelize = requires('sequelize');

const db = new sequelize({
    database: "",
    dialect: "postgres"
});

const User = db.define("users", {
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

const CreditCard = db.define("credit-cards", {
    number: {
        type: sequelize.STRING,
        unique: true
    },
    expiration: sequelize.STRING,
    balance: sequelize.INTEGER,
    limit: sequelize.INTEGER,
});

const Transaction = db.define("transactions", {
    amount: sequelize.INTEGER,
    date: sequelize.STRING,
    time: sequelize.STRING,
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