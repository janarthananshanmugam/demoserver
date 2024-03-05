const express = require("express");
const Mailrouter = express.Router();

const MailController = require("../controllers/Mail-Controller");

Mailrouter.post("/api/mail", MailController.sendEmail);
Mailrouter.get("/api/getmail", MailController.getEmail);
module.exports = Mailrouter;
