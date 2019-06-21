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
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    limit: Sequelize.INTEGER
});


const Transaction = db.define("transaction", {
    amount: Sequelize.DECIMAL(5,2),
    type: Sequelize.STRING,
    date: Sequelize.STRING,
    time: Sequelize.STRING
});

User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = {
    db,
    User,
    Transaction
};