import mongodb from 'mongodb';
const { MongoClient } = mongodb;

let connection = null;

export async function connectToDb (uri) {
  if (connection) {
    return connection;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = await client.db();

  connection = db;

  return db;
}

export async function incrementVisitors (url, collection) {
  return collection.findOneAndUpdate(
    { url },
    {
      $inc: {
        'visitors.monthly': 1,
        'visitors.daily': 1,
        'visitors.total': 1
      }
    },
    { returnNewDocument: true }
  );
}

export async function createNewEntry (url, collection) {
  return collection.insertOne({
    url,
    visitors: {
      monthly: 1,
      daily: 1,
      total: 1
    }
  });
}

export async function resetVisitors (collection, field) {
  return collection.updateMany(
    {},
    {
      $set: { [`visitors.${field}`]: 0 }
    },
    { upsert: false }
  );
}
