import { connectToDb, createNewEntry, incrementVisitors } from '../mongo';
import { render } from '../badgeMaker';

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
        .end(render('Total Visitors', visitors.totally + 1, 100));
    }

    await createNewEntry(url, collection);

    return res
      .writeHead(200, {
        'Content-Type': 'image/svg+xml'
      })
      .end(render('Total Visitors', 1, 100));
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};
