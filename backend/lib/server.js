'use strict'

const Hapi = require('@hapi/hapi')
const db = require('../models/index.js')
const path = require('path')

const init = async ({ host = 'localhost', port = 8000 } = {}) => {
  const server = Hapi.server({
    port,
    host
  })

  const Todo = db.Todo

  await server.register(require('@hapi/inert'))

  server.route(
    [
      {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
          return h.file(path.join(__dirname, '..', '..', 'frontend', 'text.html'), { confine: false })
        }
      },
      {
        method: 'GET',
        path: '/static/{params*}',
        handler: {
          directory: {
            path: path.join(__dirname, '..', '..', 'frontend', 'static'),
            listing: true
          }
        }
      }
    ]
  )

  server.route(
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

  return server
}

module.exports = {
  init
}
