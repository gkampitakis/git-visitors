import { connectToDb, resetVisitors } from '../utils/mongo';

export default async (req, res) => {
  try {
    const db = await connectToDb(process.env.MONGODB_URI);
    const collection = await db.collection(process.env.COLLECTION);

    await resetVisitors(collection, 'daily');

    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, status: 500 });
  }
};
