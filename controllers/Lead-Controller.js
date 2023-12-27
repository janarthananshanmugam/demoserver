const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://janarthanan:AYCBX8TdhKKYTQfY@janarthanan.0gezghr.mongodb.net";
const dbName = "digger";

async function getleads(req, res) {
  let client;
  try {
    client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected");
    const db = client.db(dbName);
    const result = await db.collection("leads").find().toArray();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function postleads(req, res) {
  let client;
  try {
    client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    const neworder = req.body;
    const result = await db.collection("leads").insertMany(neworder);
    res.send(result);
    console.log(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  } finally {
    if (client) {
      await client.close();
    }
  }
}

module.exports = { getleads, postleads };
