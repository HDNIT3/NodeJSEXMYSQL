const sequelize = require('../config/database');

const { DataTypes } = require('sequelize');

const Account = sequelize.define('Account', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "account",
    timestamps: false
});

// sequelize.sync({ force: true }) // Use { force: true } only in development to recreate tables
// .then(() => {
//     console.log('Database & tables created!');
// })
// .catch(err => {
//     console.error('Error syncing database:', err);
// });


module.exports = Account;
