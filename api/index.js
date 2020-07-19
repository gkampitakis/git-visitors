import mongodb from 'mongodb';
import { makeBadge } from 'badge-maker';

const { MongoClient } = mongodb;
let connection = null;

async function connectToDb(uri) {
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

async function createNewEntry(url, collection) {
  return collection.insertOne({
    url,
    visitors: 1,
  });
}

async function incrementVisitor(url, collection, visitors) {
  return collection.findOneAndUpdate(
    { url },
    { $set: { visitors: visitors++, url } },
    { returnOriginal: false }
  );
}

export default async (req, res) => {
  try {
    const db = await connectToDb(process.env.MONGODB_URI),
      { url } = req,
      collection = await db.collection('projects'),
      project = await collection.findOne({ url });

    if (project) {
      const { visitors } = project;

      const data = await incrementVisitor(url, collection, visitors);

      return res.status(200).json({ url, visitors: visitors + 1 });
    }

    await createNewEntry(url, collection);

    return res.status(200).json({ url, visitors: 1 });
  } catch (error) {
    res.status(500).json({ error });
  }
};
