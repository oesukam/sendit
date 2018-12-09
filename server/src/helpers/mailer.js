import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();
const { MAILGUN_USER, MAILGUN_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: MAILGUN_USER,
    pass: MAILGUN_PASSWORD,
  },
});

const sendMail = ({
  from = '', to = '', subject = '', bcc = '', text = '', html = '',
}) => new Promise((resolve, reject) => {
  // setup email data with unicode symbols
  if (!to) {
    throw 'Please provide to email address';
  }
  const mailOptions = {
    from: from || '"Andela - SendIT" <admin@sendit.service>', // sender address
    to: to || 'oesukam@gmail.com', // list of receivers
    bcc: bcc || undefined, // list of receivers
    subject: subject || 'Hello ✔', // Subject line
    text: text || 'Hello There!', // plain text body
    html: html || '<b>Hello There!</b>', // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      logger.error(error);
      reject(error);
    }
    if (info) {
      const message = `Message sent: ${info.messageId}`;
      logger.info(message);
    }
    resolve(true);
  });
});


export default sendMail;
