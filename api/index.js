// import url from 'url';
import mongodb from 'mongodb';

const { MongoClient } = mongodb;
let connection = null;

async function connectToDb(uri) {
  if (connection) {
    return connection;
  }

  const client = await MongoClient.connect(
    uri,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );

  const db = await client.db();

  connection = db;

  return db;
}

async function createNewEntry(url, collection) {
  return collection.insertOne({
    url,
    visitor: 1,
  });
}

export default async (req, res) => {
  try {
    const db = await connectToDb(process.env.MONGODB_URI),
      { url } = req,
      collection = await db.collection('projects'),
      project = await collection.findOne({ url });

    if (project) {
      console.log(project);
      return res.status(200).json({ project: { url: 'test', visitor: 1 } });
    }

    const object = await createNewEntry(url, collection);

    console.log(object);

    return res.status(200).json({ object });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
