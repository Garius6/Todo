'use strict'

const Hapi = require('@hapi/hapi')
const { Todo } = require('./model.js')

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
})

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

exports.init = async () => {
  await server.initialize()
  return server
}

exports.start = async () => {
  await server.start()
  console.log('Server running on %s', server.info.uri)
  return server
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})
