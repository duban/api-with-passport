const Sequelize = require('sequelize');
const sequelize = require('../../config/db');
// const bcryptService = require('../services/bcrypt.service');

// const hooks = {
//     beforeCreate(user) {
//         user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
//     },
// };

const tableName = 'products';

const Product = sequelize.define('Product', {
    product_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product_price: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.NUMBER,
        allowNull: false
    }
}, {
    tableName
});
module.exports = Product;
