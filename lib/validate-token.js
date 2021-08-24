const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

module.exports = async token => {
  return jwt.verify(token, JWT_SECRET)
}
