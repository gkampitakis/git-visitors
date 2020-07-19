import { getUrl } from '../util';
import { connectToDb, createNewEntry, incrementVisitors } from '../mongo';
import { render } from '../badgeMaker'; //FIXME: add different rules for coloring here

export default async (req, res) => {
  try {
    const db = await connectToDb(process.env.MONGODB_URI),
      url = getUrl(req.url),
      collection = await db.collection(process.env.COLLECTION),
      project = await collection.findOne({ url });

    if (project) {
      const { visitors } = project;

      await incrementVisitors(url, collection, visitors);

      res
        .writeHead(200, {
          'Content-Type': 'image/svg+xml'
        })
        .end(render('Daily Visitors', visitors.daily + 1));
    }

    await createNewEntry(url, collection);

    return res
      .writeHead(200, {
        'Content-Type': 'image/svg+xml'
      })
      .end(render('Daily Visitors', 1));
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};
