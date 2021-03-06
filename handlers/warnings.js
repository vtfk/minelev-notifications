const { logger } = require('@vtfk/logger')
const { MINELEV_URL, MAIL_TEMPLATE_NAME } = require('../config')
const getPifuData = require('../lib/get-pifu-data')
const sendMail = require('../lib/send-mail')

const generateEmail = (document, recipient) => {
  const mailText = `Hei!<br/><br/>${document.userName} har sendt varsel til en av dine elever i MinElev.<br />
  Mer informasjon om varselet finner du <a href="${MINELEV_URL}/elever/${document.studentUserName}/${document.id}">på denne siden</a>.`

  const mail = {
    to: [recipient.email],
    from: 'MinElev <minelev@vtfk.no>',
    subject: 'Varsel sendt til en av dine elever',
    html: mailText
  }

  if (MAIL_TEMPLATE_NAME) {
    mail.template = {
      templateName: MAIL_TEMPLATE_NAME,
      templateData: {
        body: mail.html,
        signature: {
          name: 'MinElev',
          company: 'Opplæring og folkehelse'
        }
      }
    }
  }

  return mail
}

module.exports = async data => {
  const { userId, studentUserName } = data
  const results = await getPifuData(userId, studentUserName)
  const payload = Array.isArray(results) ? results : []
  const teachers = payload.filter(teacher => teacher.username !== userId && teacher.email)
  const invalidTeachers = payload.filter(teacher => teacher.username !== userId && !teacher.email)

  if (teachers.length > 0) {
    logger('info', ['handler', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, 'teachers', teachers.map(teacher => teacher.username).join(','), 'start'])
    if (invalidTeachers.length > 0) {
      logger('info', ['handler', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, 'invalid teachers', invalidTeachers.map(teacher => teacher.username).join(',')])
    }
    const mails = teachers.map(teacher => generateEmail(data, teacher))
    const jobs = mails.map(sendMail)
    const logs = await Promise.all(jobs)
    logger('info', ['handler', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, logs.length, 'finish'])
    return { success: true, notifications: logs.length, logs }
  } else {
    logger('info', ['handler', 'action', 'notifyContactTeachers', 'userId', userId, 'studentUserName', studentUserName, 'no one to notify'])
    return { succes: true, notifications: 0 }
  }
}
