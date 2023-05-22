'use strict'

const jwt = require('jsonwebtoken')
const db = require('../entity')
const { logger } = require('../utils')
const { v4: uuidV4 } = require('uuid')

module.exports.checkAuth = async (req, res, next) => {
  let { ac, rf } = req.cookies
  let status = 'good'

  if (!ac && !rf) {
    logger.http(req, 401, 'Invalid access token & refresh token')
    return res.status(401).json({ status: false, message: 'Invalid access token' })
  }

  if (ac) {
    try {
      const decodeToken = jwt.verify(ac, process.env.JWT_SECRET)
      const findMatchAc = await db.TblUserSession.findOne({
        attributes: ['id'],
        where: { user_id: decodeToken.user.id, ac_uid: decodeToken.uid }
      })

      if (!findMatchAc) {
        status = 'invalid_ac'
        logger.http(req, 401, `Invalid access token by ${decodeToken.uid}, checking refresh token`)
      } else {
        req.user = decodeToken.user
      }
    } catch (error) {
      status = 'expire_ac'
      logger.http(req, 401, `Failed verify access token with ${error.message}, checking refresh token`)
    }
  } else {
    status = 'invalid_ac'
  }

  if (rf && status !== 'good') {
    try {
      const decodeToken = jwt.verify(rf, process.env.JWT_SECRET)
      const findMatchRf = await db.TblUserSession.findOne({
        attributes: ['id'],
        where: { user_id: decodeToken.user.id, rf_uid: decodeToken.uid }
      })

      if (!findMatchRf) {
        logger.http(req, 401, `Invalid refresh token by ${decodeToken.uid}`)
        return res.status(401).json({ status: false, message: 'Invalid or expire token, please sing in' })
      } else {
        let tokenUID = uuidV4()
        const newTokenAc = jwt.sign({ uid: tokenUID, user: decodeToken.user }, process.env.JWT_SECRET, {
          algorithm: 'HS256',
          expiresIn: '5m'
        })

        const resultUpdateUserSession = db.TblUserSession.update(
          { ac_uid: tokenUID },
          { where: { user_id: decodeToken.user.id }, returning: true }
        )
        if (resultUpdateUserSession[0] < 1) {
          logger.http(req, 200, `Failed update user session for userid ${user.id}`)
          return res.json({ status: false, message: 'Failed to validate session, please try again' })
        }

        let options = {}
        res.cookie('ac', newTokenAc, { ...options, maxAge: 1000 * 60 * 5 })
        logger.http(req, 401, `Successful generate new access token with ac_uid ${tokenUID}`)
        req.user = decodeToken.user
      }
    } catch (error) {
      status = 'expire_ac'
      logger.http(req, 401, `Failed verify refresh token with ${error.message}, checking refresh token`)
      return res.status(401).json({ status: false, message: 'Invalid or expire token, please sing in' })
    }
  }

  next()
}
