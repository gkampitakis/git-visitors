import { connectToDb, createNewEntry, incrementVisitors } from './utils/mongo';
import { render } from './utils/badgeMaker';

export default async (req, res) => {
  try {
    const db = await connectToDb(process.env.MONGODB_URI),
      { url } = req,
      collection = await db.collection(process.env.COLLECTION),
      project = await collection.findOne({ url });

    if (project) {
      const { visitors } = project;

      await incrementVisitors(url, collection);

      return res
        .writeHead(200, {
          'Content-Type': 'image/svg+xml'
        })
        .end(
          render({
            daily: visitors.daily + 1,
            monthly: visitors.monthly + 1,
            total: visitors.total + 1
          })
        );
    }

    await createNewEntry(url, collection);

    return res
      .writeHead(200, {
        'Content-Type': 'image/svg+xml'
      })
      .end(render({ daily: 1, monthly: 1, total: 1 }));
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};
