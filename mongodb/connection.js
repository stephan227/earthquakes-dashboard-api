const url = require('url');
const MongoClient = require('mongodb').MongoClient;

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  const db = await client.db("earthquakes");
  cachedDb = db;
  return db;
}

module.exports = connectToDatabase;