'use strict'

const { Server } = require('./lib/server')

const server = new Server({ port: 8000 })

server.start()
