'use strict'

const utils = require('./Utils')
const { createLogger, format, transports } = require('winston')

const loggerControl = createLogger({
  transports: [
    new transports.Console({
      level: process.env.LOG_LEVEL,
      eol: '\n',
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH24:mm:ss'
        }),
        format.printf((info) => `${info.timestamp} ${info.level} ${info.message}`)
      )
    })
  ],
  silent: process.env.LOG_ENABLED === 'true' ? false : true
})

/**
 * Function to display debug console
 * @param req The request from client
 * @param message debug console message
 * @returns Null
 */
const debug = (req, message) => {
  if (req) {
    const url = req.originalUrl.split('?')[0]
    loggerControl.debug(`${utils.getClientIp(req)} ${req.method} ${url} ${message}`)
  } else {
    loggerControl.debug(`${message}`)
  }
}

/**
 * Function to display info console
 * @param message debug console message
 * @returns Null
 */
const info = (message) => {
  loggerControl.info(`${message}`)
}

/**
 * Function to display debug console
 * @param req The request from client
 * @param status The response status code (200, 401, 403, 412, 419, 500, 502)
 * @param message debug console message
 * @returns Null
 */
const http = (req, status, message) => {
  if (req) {
    const url = req.originalUrl.split('?')[0]
    loggerControl.http(`${status} ${utils.getClientIp(req)} ${req.method} ${url} ${message}`)
  } else {
    loggerControl.http(`${message}`)
  }
}

/**
 * Function to display warning console
 * @param message debug console message
 * @returns Null
 */
const warn = (message) => {
  loggerControl.warn(`${message}`)
}

/**
 * Function to display error console
 * @param message debug console message
 * @returns Null
 */
const error = (message) => {
  loggerControl.error(`${message}`)
}

const logger = { debug, info, warn, http, error }

module.exports = logger
