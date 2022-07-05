'use strict'

const { Server } = require('./lib/server')

const server = new Server({ port: 8000 })

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

server.start()
