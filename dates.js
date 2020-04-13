const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url =
  "mongodb+srv://Coco:californiaofw282*@cluster0-imjyy.azure.mongodb.net/test?retryWrites=true&w=majority";
// Database Name
const dbName = "date";
const client = new MongoClient(url);

(async function () {
  try {
    // Use connect method to connect to the Server
    await client.connect();

    const db = client.db(dbName);

    // Insert into DB (console.log is not required)
    db.collection("dates").insertOne({ date: new Date() }, function (err, res) {
      if (err) throw err;
      console.log("Document ajouté !");
    });

    // Read data from DB (console.log is usefull to see what you have in storage)
    db.collection("dates")
      .find({})
      .toArray(function (err, res) {
        if (err) throw err;
        console.log(res);
      });
  } catch (err) {
    // If an error is restrieve during the API call, ths error will appear in the console.log
    console.log(err.stack);
  }

  // End the API call
  client.close();
})();
