const axios = require('axios').default
const { logger } = require('@vtfk/logger')
const generateSystemJwt = require('./generate-system-jwt')
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
    logger('error', ['get-pifu-data', 'userId', userId, 'studentUserName', studentUserName, 'contactteachers', error])
    throw error
  }
}
