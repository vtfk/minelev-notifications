const { logger, logConfig } = require('@vtfk/logger')
const withTokenAuth = require('../lib/with-token-auth')
const getResponse = require('../lib/get-response-object')
const HTTPError = require('../lib/http-error')

const handleNotification = async (context, req) => {
  const { type, ...body } = req.body

  logConfig({
    prefix: `${body.id} - ${type}`
  })

  logger('info', ['notification', 'start'])
  try {
    const handler = require(`../handlers/${type}.js`)
    const result = await handler(body)
    logger('info', ['notification', 'finish'])
    return getResponse(result)
  } catch (error) {
    logger('error', ['notification', 'error', error])
    if (error instanceof HTTPError) return error.toJSON()
    return new HTTPError(500, error).toJSON()
  }
}

module.exports = (context, req) => withTokenAuth(context, req, handleNotification)
