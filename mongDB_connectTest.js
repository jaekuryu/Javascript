const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://jaeku:wjdgus2302@cluster0.r1yhop4.mongodb.net?retryWrites=true&w=majority";
//const uri = "mongodb+srv://jaeku:wjdgus2302@cluster0.r1yhop4.mongodb.net?authSource=admin&appName=mongDB_connectTest.js";
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

console.log("Starting MongoDB connection");

client.connect((err) => {
  if (err) {
    console.log("Error connecting to MongoDB:", err);
    return;
  }

  console.log("Connected to MongoDB");

  const database = client.db();

  // Execute the 'show dbs' command
  database.admin().listDatabases((err, result) => {
    if (err) {
      console.log("Error executing 'show dbs' command:", err);
      return;const { MongoClient, ServerApiVersion } = require('mongodb');
    }

    console.log("Databases:");
    result.databases.forEach(db => {
      console.log(`- ${db.name}`);
    });

    client.close();
  });
});