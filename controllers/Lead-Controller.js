const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";

async function getleads(req, res) {
    const dbo = await MongoClient.connect(url)
    const db = dbo.db("kTools");
    try {
        const result = await db.collection("leads").find().toArray();
        res.send(result)
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        dbo.close();
    }
}
async function postleads(req, res) {
    const dbo = await MongoClient.connect(url)
    const db = dbo.db("kTools");
    try {
        var neworder = req.body;
        const result = await db.collection("leads").insertMany(neworder)
        res.send(result)
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        dbo.close();
    }
}
module.exports = { getleads,postleads}
