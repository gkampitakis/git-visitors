import { connectToDb, createNewEntry, incrementVisitor } from './mongo';
import { render } from './badgeMaker';

export default async (req, res) => {
  try {
    const db = await connectToDb(process.env.MONGODB_URI),
      { url } = req,
      collection = await db.collection('projects'),
      project = await collection.findOne({ url });

    if (project) {
      const { visitors } = project;

      const data = await incrementVisitor(url, collection, visitors);

      res
        .writeHead(200, {
          'Content-Type': 'image/svg+xml',
        })
        .end(render('visitors', visitors + 1));
    }

    await createNewEntry(url, collection);

    return res
      .writeHead(200, {
        'Content-Type': 'image/svg+xml',
      })
      .end(render('visitors', 1));
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};
