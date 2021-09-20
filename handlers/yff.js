const { logger } = require('@vtfk/logger')
const { MAIL_TEMPLATE_NAME } = require('../config')
const sendMail = require('../lib/send-mail')

const generateEmail = data => {
  const mail = {
    to: [...data.recipients],
    from: data.sender || 'MinElev <minelev@vtfk.no>',
    subject: 'Bekreftelse om utplassering av elev',
    html: 'Hei!<br/><br/>Vedlagt oversendes bekreftelse på utplassering av elev i YFF.<br />',
    attachments: [
      {
        content: data.document.data,
        filename: 'Bekreftelse-utplassering.pdf',
        type: 'application/pdf'
      }
    ]
  }

  if (MAIL_TEMPLATE_NAME) {
    mail.template = {
      templateName: MAIL_TEMPLATE_NAME,
      templateData: {
        body: mail.html,
        signature: {
          name: data.userName,
          company: data.schoolName,
          virksomhet: true
        }
      }
    }
  }

  return mail
}

module.exports = async data => {
  const { userId, studentUserName } = data
  const mail = generateEmail(data)
  logger('info', ['handler', 'action', 'sendmail', 'userId', userId, 'studentUserName', studentUserName, 'start'])
  const log = await sendMail(mail)
  logger('info', ['handler', 'action', 'sendmail', 'userId', userId, 'studentUserName', studentUserName, 'finish'])
  return { success: true, log }
}
