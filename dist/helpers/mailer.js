"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const {
  MAILGUN_USER,
  MAILGUN_PASSWORD
} = process.env;

const transporter = _nodemailer.default.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false,
  // true for 465, false for other ports
  auth: {
    user: MAILGUN_USER,
    pass: MAILGUN_PASSWORD
  }
});

const sendMail = ({
  from = '',
  to = '',
  subject = '',
  bcc = '',
  text = '',
  html = ''
}) => {
  // setup email data with unicode symbols
  const mailOptions = {
    from: from || '"Andela - SendIT" <admin@sendit.service>',
    // sender address
    to: to || 'oesukam@gmail.com',
    // list of receivers
    bcc: bcc || undefined,
    // list of receivers
    subject: subject || 'Hello ✔',
    // Subject line
    text: text || 'Hello There!',
    // plain text body
    html: html || '<b>Hello There!</b>' // html body

  }; // send mail with defined transport object

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log('Message sent: %s', info.messageId);
    return true;
  });
};

var _default = sendMail;
exports.default = _default;