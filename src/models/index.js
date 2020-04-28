const dbConfig = require('../db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {}

db.authtokens = require('./authtokens.model.js')(sequelize, Sequelize)
db.usuarios = require('./usuarios.model.js')(sequelize, Sequelize)

db.authtokens.associate(db.usuarios)
db.usuarios.associate(db.authtokens)

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
