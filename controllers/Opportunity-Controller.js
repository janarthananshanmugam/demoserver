const leadData = [
    {
        id:1,
        name : "Jana1"
    },
    {
        id:2,
        name : "Jana2"
    },
    {
        id:3,
        name : "Jana3"
    }
]

const getOpportunity = (req,res) =>{
    res.json(leadData)
}

const getOpportunityById = (req,res) =>{
    res.send(leadData)
}


module.exports={
    getOpportunity,
    getOpportunityById
}