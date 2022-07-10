'use strict'

const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script()
const { init } = require('../lib/server')

const db = require('../models/index.js')

describe('Todo CRUD test', () => {
  let server

  beforeEach(async () => {
    server = await init()
    await server.initialize()
    await db.Todo.sync()
  })

  afterEach(async () => {
    await server.stop()
  })

  it('/api/todo respond with 200', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/todo'
    })

    expect(res.statusCode).to.equal(200)
  })
})
