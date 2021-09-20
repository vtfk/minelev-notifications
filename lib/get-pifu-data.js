const axios = require('axios').default
const { logger } = require('@vtfk/logger')
const generateSystemJwt = require('./generate-system-jwt')
const HTTPError = require('./http-error')
const { PIFU_JWT_SECRET, PIFU_URL } = require('../config')

module.exports = async (userId, studentUserName) => {
  const token = generateSystemJwt({ userId, secret: PIFU_JWT_SECRET })
  const url = `${PIFU_URL}/students/${studentUserName}/contactteachers`
  logger('info', ['get-pifu-data', 'userId', userId, 'studentUserName', studentUserName, 'contactteachers', 'start'])

  axios.defaults.headers.common.Authorization = token

  try {
    const { data } = await axios.get(url)
    logger('info', ['get-pifu-data', 'userId', userId, 'studentUserName', studentUserName, 'contactteachers', 'finish'])
    return data
  } catch (error) {
    const { status, data } = error.response
    logger('error', ['get-pifu-data', 'userId', userId, 'studentUserName', studentUserName, 'contactteachers', status, data])
    throw new HTTPError(status, data)
  }
}
