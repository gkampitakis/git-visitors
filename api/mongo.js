import mongodb from 'mongodb';
const { MongoClient } = mongodb;

let connection = null;

export async function connectToDb(uri) {
  if (connection) {
    return connection;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db();

  connection = db;

  return db;
}

export async function incrementVisitor(url, collection, visitors) {
  return collection.findOneAndUpdate(
    { url },
    { $set: { visitors: visitors + 1, url } },
    { returnOriginal: false }
  );
}

export async function createNewEntry(url, collection) {
  return collection.insertOne({
    url,
    visitors: 1,
  });
}
