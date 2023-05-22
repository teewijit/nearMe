const { logger, validation } = require('../utils')

module.exports.SignIn = (req, res, next) => {
  const rules = {
    username: 'required',
    password: 'required'
  }
  const validate = validation(req.body, rules)
  if (!validate.status) {
    logger.http(req, 412, validate.message)
    return res.status(412).json({ status: false, message: validate.message })
  }

  return next()
}
