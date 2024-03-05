const nodemailer = require("nodemailer");

const sendEmail = (req, res) => {
  console.log(req.body);
  const { email, password, receiver, subject, text } = req.body;

  // Create a Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email, // sender's email
      pass: password, // sender's password
    },
  });

  // Email message options
  const mailOptions = {
    from: email, // sender address
    to: receiver, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to send email." });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully." });
    }
  });
};
const getEmail = (req, res) => {
  res.status(200).json({ success: true });
};

module.exports = {
  sendEmail,
  getEmail,
};
