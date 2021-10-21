const Sequelize = require('sequelize');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
// console.log(process.env.DB_NAME)

let database = new Sequelize({
    database:process.env.DB_NAME,
    username:process.env.DB_USER,
    password:process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: { multipleStatements: true },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = database;
