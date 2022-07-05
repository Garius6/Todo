'use strict'

const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script()
const { Server } = require('../lib/server')

describe('Todo CRUD test', () => {
  const server = new Server()

  beforeEach(async () => {
    server.init()
    await server.Todo.sync()
  })

  afterEach(async () => {
    await server.server.stop()
  })

  it('/api/todo respond with 200', async () => {
    const res = await server.server.inject({
      method: 'GET',
      url: '/api/todo'
    })

    expect(res.statusCode).to.equal(200)
  })
})
