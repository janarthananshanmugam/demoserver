const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const Port = 8000;

app.use(bodyParser.json());
app.use(cors());

const Leadrouter = require("./router/Leadrouter");
const Opportunityrouter = require("./router/Opportunityrouter");

app.use(Leadrouter);
app.use(Opportunityrouter);

app.listen(Port, () => {
  console.log("Server Started", Port);
});
