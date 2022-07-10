'use strict'

const { init } = require('./lib/server')

init()
  .then(server => {
    server.start()
    console.log('Server running on %s', server.info.uri)
  })
  .catch(err => {
    console.log(err)
  })

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})
