'use strict'

const Hapi = require('@hapi/hapi')
const { initDb } = require('./model.js')

class Server {
  constructor ({ host = 'localhost', port = 3000, dbPath = './storage.db' } = {}) {
    console.log(host)
    this.server = Hapi.server({
      port,
      host
    })

    const { Todo } = initDb(dbPath)

    this.server.route(
      [
        {
          method: 'GET',
          path: '/api/todo',
          handler: (request, h) => {
            return Todo.findAll()
          }
        },
        {
          method: 'GET',
          path: '/api/todo/{id}',
          handler: (request, h) => {
            return Todo.findAll(
              {
                where: {
                  id: request.params.id
                }
              })
          }
        },
        {
          method: 'POST',
          path: '/api/todo',
          handler: (request, h) => {
            Todo.create(request.payload)
            return h.response()
          }
        },
        {
          method: 'PUT',
          path: '/api/todo/{id}',
          handler: (request, h) => {
            Todo.update(request.payload,
              {
                where: {
                  id: request.params.id
                }
              })
            return h.response()
          }
        },
        {
          method: 'DELETE',
          path: '/api/todo/{id}',
          handler: (request, h) => {
            Todo.destroy(
              {
                where: {
                  id: request.params.id
                }
              })
            return h.response()
          }
        }
      ])
  }

  async init () {
    await this.server.initialize()
    return this.server
  }

  async start () {
    await this.server.start()
    console.log('Server running on %s', this.server.info.uri)
    return this.server
  }
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

module.exports = {
  Server
}
