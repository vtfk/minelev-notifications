const axios = require('axios').default
const { logger } = require('@vtfk/logger')
const generateSystemJwt = require('./generate-system-jwt')
const HTTPError = require('./http-error')
const { MAIL_SERVICE_JWT, MAIL_SERVICE_URL } = require('../config')

module.exports = async email => {
  if (MAIL_SERVICE_JWT) {
    const token = `Bearer ${generateSystemJwt({ secret: MAIL_SERVICE_JWT })}`
    axios.defaults.headers.common.Authorization = token
  }

  try {
    const { data } = await axios.post(MAIL_SERVICE_URL, email)
    return data
  } catch (error) {
    const { status, data } = error.response
    logger('error', ['send-mail', 'recipients', email.to.length, 'from', email.from, 'subject', email.subject, status, data])
    throw new HTTPError(status, data)
  }
}
