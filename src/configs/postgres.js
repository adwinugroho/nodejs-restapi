const { Sequelize, DataTypes } = require('sequelize')

const config = {
    Host: process.env.PG_HOST,
    Port: parseInt(process.env.PG_PORT || "5432"),
    Username: process.env.PG_USER,
    Password: process.env.PG_PASS,
    DBName: process.env.PG_DBNAME
}

const sequelize = new Sequelize(config.DBName, config.Username, config.Password, {
    host: config.Host,
    port: config.Port,
    pool: {
        max: 10,
        idle: 12000
    },
    dialect: 'postgres'
})

sequelize.authenticate().then(() => console.log("Database Connection established")).catch(error => new Error(error))


module.exports = { sequelize, Sequelize, config }