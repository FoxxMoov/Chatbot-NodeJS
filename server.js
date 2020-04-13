const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

const FICHIER_REPONSES = "réponses.json";

console.log("Lecture des réponses depuis", FICHIER_REPONSES);

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

promesseReponses
  .catch((err) => {
    console.error("echec de lecture du fichier:", err);
    process.exit();
  })
  .then((data) => {
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

    app.post("/chat", function (req, res) {
      let request = req.body.msg;
      if (request === "météo") {
        res.send("Il fait beau");
      } else if (request === "ville") {
        res.send("Nous sommes à Paris");
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
          let data = JSON.stringify(info);
          writeFileAsPromised(FICHIER_REPONSES, data)
            .then(() => {
              res.send("Merci pour cette information !");
            })
            .catch((err) => {
              console.error(err);
              res.send("Erreur... Reessayez plus tard.");
            });
        }
      }
    });

    app.listen(process.env.PORT || 3000, function () {
      console.log("Example app listening on port " + process.env.PORT + " !");
    });
  });
