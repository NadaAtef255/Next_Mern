const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/Next";
console.log("Connect");
let mongoClient;
let clientPromise;
if (!clientPromise) {
  mongoClient = new MongoClient(uri);
  clientPromise = mongoClient.connect();
  console.log("Connected to Mongo");
}

export default clientPromise;
