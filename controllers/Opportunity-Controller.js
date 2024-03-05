const leadData = [
  {
    id: 1,
    name: "Meena",
  },
  {
    id: 2,
    name: "Jana",
  },
  {
    id: 3,
    name: "Nila",
  },
];

const getOpportunity = (req, res) => {
  console.log(leadData);
  res.json(leadData);
};

const getOpportunityById = (req, res) => {
  res.send(leadData);
};

module.exports = {
  getOpportunity,
  getOpportunityById,
};
