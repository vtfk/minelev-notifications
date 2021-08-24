module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'Super secret secret',
  MINELEV_URL: process.env.MINELEV_URL || 'MinElev',
  PIFU_JWT_SECRET: process.env.PIFU_JWT_SECRET || 'Super secret secret',
  PIFU_URL: process.env.PIFU_URL || 'pifu.no',
  MAIL_SERVICE_URL: process.env.MAIL_SERVICE_URL || 'mail.service.no',
  MAIL_SERVICE_JWT: process.env.MAIL_SERVICE_JWT || false,
  MAIL_TEMPLATE_NAME: process.env.MAIL_TEMPLATE_NAME || false
}
