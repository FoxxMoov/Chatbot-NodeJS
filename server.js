const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

let path = "réponses.json";

fs.readFile(path, "utf-8", (err, data) => {
  if (err) throw err;
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
        fs.writeFile(path, data, function (err) {
          if (err) return err;
          res.send("Merci pour cette information !");
        });
      }
    }
  });

  app.listen(process.env.PORT || 3000, function () {
    console.log("Example app listening on port " + process.env.PORT + " !");
  });
});
