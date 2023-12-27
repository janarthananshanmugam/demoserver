const express = require("express");

const Opportunityrouter =express.Router();

const OpportunityController = require('../controllers/Opportunity-Controller')

Opportunityrouter.get("/api/Opportunities",OpportunityController.getOpportunity)
Opportunityrouter.get("/api/Opportunities/:id",OpportunityController.getOpportunityById)

module.exports = Opportunityrouter;