const {Sequelize} = require('sequelize')

const db = new Sequelize({
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'Average-Calculator',
    dialect: 'mysql'
})

module.exports = db