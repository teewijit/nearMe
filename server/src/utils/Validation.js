'use strict'

const validator = require('validatorjs')
const messageValidator = require('../../resource/language/th/validation')
validator.setMessages('th', messageValidator)
validator.useLang('th')

module.exports = (body, rules) => {
  const validate = new validator(body, rules)
  if (validate.fails()) {
    const message = validate.errors.errors[Object.keys(validate.errors.errors)[0]][0]
    return { status: false, message }
  }

  return { status: true }
}
