const axios = require('axios').default
const generateSystemJwt = require('./generate-system-jwt')
const { MAIL_SERVICE_JWT, MAIL_SERVICE_URL } = require('../config')

module.exports = async email => {
  if (MAIL_SERVICE_JWT) {
    const token = `Bearer ${generateSystemJwt({ secret: MAIL_SERVICE_JWT })}`
    axios.defaults.headers.common.Authorization = token
  }

  const { data } = await axios.post(MAIL_SERVICE_URL, email)
  return data
}
