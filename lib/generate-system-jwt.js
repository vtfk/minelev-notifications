const jwt = require('jsonwebtoken')
const { name, version } = require('../package.json')

module.exports = options => {
  const payload = {
    system: name,
    version: version,
    caller: options.userId
  }

  const settings = {
    expiresIn: '1m',
    issuer: 'https://auth.vtfk.no'
  }

  return jwt.sign(payload, options.secret, settings)
}
