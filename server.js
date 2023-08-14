const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const PORT = 9000;
const connectionString =
  "mongodb+srv://aiulun:valorant@cluster0.vbk2exd.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// SERVER SIDE
// take inputs from dropdowns on the client side
// user fisher-yates shuffle on array of agents which have a number
// slice(agents.length - selectionValue)
// Respond with sliced agents
// CLIENT SIDE
// manipulate dom to show final lineup
// conditional check to make sure input total === 5

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("valo-agents");
    const agentCollection = db.collection("agents");

    app.get("/", (request, response) => {
      agentCollection
        .find()
        .toArray()
        .then((results) => {
          console.log(results);
          response.json(results);
        })
        .catch((error) => console.error(error));
    });

    app.get("/api/:agentName", (request, response) => {
      const agentName = request.params.agentName.toLowerCase();
      agentCollection
        .find({ name: agentName })
        .toArray()
        .then((results) => {
          response.json(results[0]);
        })
        .catch((error) => console.error(error));
    });

    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
