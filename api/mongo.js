import mongodb from 'mongodb';
const { MongoClient } = mongodb;

let connection = null;

//FIXME: setup cron jobs

export async function connectToDb(uri) {
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

export async function incrementVisitors(url, collection, visitors) {
  const { monthly, daily, totally } = visitors;

  return collection.findOneAndUpdate(
    { url },
    {
      $set: {
        visitors: {
          monthly: monthly + 1,
          daily: daily + 1,
          totally: totally + 1
        },
        url
      }
    },
    { returnNewDocument: true }
  );
}

export async function createNewEntry(url, collection) {
  return collection.insertOne({
    url,
    visitors: {
      monthly: 1,
      daily: 1,
      totally: 1
    }
  });
}
