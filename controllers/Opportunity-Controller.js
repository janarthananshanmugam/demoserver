const leadData = [
  {
    id: 1,
    name: "Meena",
  },
  {
    id: 2,
    name: "Jana2",
  },
  {
    id: 3,
    name: "Jana3",
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
