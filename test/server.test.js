'use strict'

const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script()
const { Server } = require('../lib/server')

const dbPath = './db_test'

describe('Todo CRUD test', () => {
  const server = new Server({ dbPath })

  beforeEach(async () => {
    server.init()
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
