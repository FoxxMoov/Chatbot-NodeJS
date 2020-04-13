const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const url = process.env.MONGODB_URI;
const dbName = "chat-bot";
const client = new MongoClient(url);
const FICHIER_REPONSES = "réponses.json";

function readFileAsPromised(file, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(FICHIER_REPONSES, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function writeFileAsPromised(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

const promesseReponses = readFileAsPromised(FICHIER_REPONSES, "utf8");

(async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("messages");

  let data;
  try {
    data = await promesseReponses;
  } catch (err) {
    console.error("echec de lecture du fichier:", err);
    process.exit();
  }
  var info = JSON.parse(data);

  app.use(bodyParser.json());

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  app.get("/hello", function (req, res) {
    if (req.query.nom === undefined) {
      res.send("Quel est votre nom ?");
    } else {
      res.send("Bonjour, " + req.query.nom + " !");
    }
  });

  app.post("/chat", async function (req, res) {
    let request = req.body.msg;
    if (request === "météo") {
      res.send("Il fait beau");
    } else if (request === "ville") {
      const message = "Nous sommes à Paris";
      const messageBot = { from: "user", msg: req.body.msg };
      const messageUser = { from: "bot", msg: message };
      try {
        collection.insertOne(messageBot, function (err) {
          if (err) throw err;
        });
        collection.insertOne(messageUser, function (err) {
          if (err) throw err;
        });
        res.send(message);
      } catch (err) {
        console.error(err);
      }
    } else if (request != -1) {
      if (request.search(" = ") == -1) {
        if (info[request] == undefined) {
          res.send("Je ne connais pas demain...");
        } else if (info[request] != undefined) {
          res.send(request + ": " + info[request]);
        }
      } else {
        var response = request.split(" = ");
        info[response[0]] = response[1];
        let datas = JSON.stringify(info);
        try {
          await writeFileAsPromised(FICHIER_REPONSES, datas);
          res.send("Merci pour cette information !");
        } catch (err) {
          console.error(err);
          res.send("Erreur... Reessayez plus tard.");
        }
      }
    }
  });

  app.get("/messages/all", async function (req, res) {
    try {
      const response = await collection
        .find({}, { projection: { _id: 0, from: 1, msg: 1 } })
        .toArray();
      res.send(response);
    } catch (err) {
      console.error(err);
    }
  });

  app.delete("/messages/last", async function (req, res) {
    const msgBot = await collection
      .find({ from: "bot" })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    const msgUser = await collection
      .find({ from: "user" })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    try {
      await collection.deleteOne(msgBot[0]);
      await collection.deleteOne(msgUser[0]);
      res.send("Messages supprimés");
    } catch (err) {
      console.error(err);
    }
  });

  app.listen(PORT, function () {
    console.log("Example app listening on port " + PORT + " !");
  });
})();
