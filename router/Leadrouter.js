const express = require("express");
const Leadrouter = express.Router();

const LeadController = require('../controllers/Lead-Controller')

Leadrouter.get("/api/leads",LeadController.getleads)
Leadrouter.post("/api/leads",LeadController.postleads)
module.exports= Leadrouter;