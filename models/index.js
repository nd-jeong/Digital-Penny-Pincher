const Sequelize = require('sequelize');

// const db = new sequelize({
//     database: "dpp_db",
//     dialect: "postgres",
//     define: {
//         underscored: true,
//         returning: true,
//         freezeTableName: true
//     }
// });

const db = new Sequelize(process.env.DATABASE_URL , {
    dialect: 'postgres',
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
    },
    limit: sequelize.INTEGER
});


const Transaction = db.define("transaction", {
    amount: sequelize.DECIMAL(5,2),
    type: sequelize.STRING,
    date: sequelize.STRING,
    time: sequelize.STRING
});

User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = {
    db,
    User,
    Transaction
};