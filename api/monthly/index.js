import { getUrl } from '../util';
import { connectToDb, createNewEntry, incrementVisitors } from '../mongo';
import { render } from '../badgeMaker';

export default async (req, res) => {
  try {
    const db = await connectToDb(process.env.MONGODB_URI),
      url = getUrl(req.url),
      collection = await db.collection(process.env.COLLECTION),
      project = await collection.findOne({ url });

    if (project) {
      const { visitors } = project;

      // await incrementVisitors(url, collection);

      return res
        .writeHead(200, {
          'Content-Type': 'image/svg+xml'
        })
        .end(render('Monthly Visitors', visitors.monthly, 10));
    }

    await createNewEntry(url, collection);

    return res
      .writeHead(200, {
        'Content-Type': 'image/svg+xml'
      })
      .end(render('Monthly Visitors', 1, 10));
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};
