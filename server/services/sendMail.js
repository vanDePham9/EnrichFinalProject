require('dotenv').config()
const nodeMailer = require("nodemailer");

const { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_PASSWORD, HOST_SEND_MAIL, PORT_SEND_MAIL } = process.env

const sendMail = async (mailOptions) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: HOST_SEND_MAIL,
      port: PORT_SEND_MAIL,
      auth: {
        user: SENDER_EMAIL_ADDRESS,
        pass: SENDER_EMAIL_PASSWORD
      }
    });
    await transporter.sendMail(mailOptions);
    console.log("email sent successfully.");
  } catch (error) {
    console.log(error, "email not sent.");
  }
};

module.exports.sendMail = sendMail;
