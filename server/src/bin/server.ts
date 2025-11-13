#!/usr/bin/env node

import app from '../app'
import chalk from 'chalk'
import { createServer } from 'http'
import { ExpressError } from '../types/error'
import Database from '../config/db'

const port = normalizePort(process.env.PORT || '8080')
app.set('port', port)

const server = createServer(app)

server.listen(port)
Database.connect()
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val: string) {
  let port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

function onError(error: ExpressError) {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`)
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  let addr = server.address()
  let bind = typeof addr === 'string' ? `pipe  ${addr}` : `port ${addr?.port}`
  console.log(chalk.cyan(`Listening on ${bind}.`))
}
