const express = require("express");
const app = express();

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

app.use(express.json());
app.post("/chat", function (req, res) {
  if (req.body.msg === "météo") {
    res.send("Il fait beau");
  } else if (req.body.msg === "ville") {
    res.send("Nous sommes à Paris");
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Example app listening on port " + process.env.PORT + " !");
});
