const url = require('url');
const MongoClient = require('mongodb').MongoClient;

let connection = null;

async function connectToDb(uri) {
  if (connection) {
    return connection;
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  const db = await client.db(
  );

  connection = db;
  return;
}

module.exports = async (req, res) => {
  const db = await connectToDb();

  const data = await collection.find({}).toArray();

  res.status(200).json({ data });
};
