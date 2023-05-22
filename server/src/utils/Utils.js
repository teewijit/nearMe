'use strict'

module.exports.getClientIp = (req) => {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'test ') return '::-1'
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  return ip
}
