const { Sequelize, DataTypes } = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './storage.db'
})

const Todo = db.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
})

Todo.sync()

module.exports = {
  Todo
}
