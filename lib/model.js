const { Sequelize, DataTypes } = require('sequelize')

const initDb = (dbPath) => {
  const db = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath
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

  return { Todo }
}

module.exports = {
  initDb
}
