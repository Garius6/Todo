'use strict'

const Hapi = require('@hapi/hapi')
const db = require('../models/index.js')

class Server {
  constructor ({ host = 'localhost', port = 3000 } = {}) {
    this.server = Hapi.server({
      port,
      host
    })

    this.Todo = db.Todo

    this.server.route(
      [
        {
          method: 'GET',
          path: '/api/todo',
          handler: (request, h) => {
            return this.Todo.findAll()
          }
        },
        {
          method: 'GET',
          path: '/api/todo/{id}',
          handler: (request, h) => {
            return this.Todo.findAll(
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
            this.Todo.create(request.payload)
            return h.response()
          }
        },
        {
          method: 'PUT',
          path: '/api/todo/{id}',
          handler: (request, h) => {
            this.Todo.update(request.payload,
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
            this.Todo.destroy(
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

module.exports = {
  Server
}
