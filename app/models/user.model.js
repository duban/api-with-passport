const Sequelize = require('sequelize');
const sequelize = require('../../config/db');
// const bcryptService = require('../services/bcrypt.service');

// const hooks = {
//     beforeCreate(user) {
//         user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
//     },
// };

const tableName = 'users';

const User = sequelize.define('User', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },

}, {
    tableName
});
// eslint-disable-next-line
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};
module.exports = User;
