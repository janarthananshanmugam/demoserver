const express = require("express");
const Mailrouter = express.Router();

const MailController = require("../controllers/Mail-Controller");

Mailrouter.post("/api/mail", MailController.sendEmail);
module.exports = Mailrouter;
