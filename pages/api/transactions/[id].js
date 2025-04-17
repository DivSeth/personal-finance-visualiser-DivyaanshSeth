import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('transactions');

  if (req.method === 'PUT') {
    const { amount, date, description, category } = req.body;
    if (!amount || !date || !description || !category) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
    const update = {
      amount: parseFloat(amount),
      date: new Date(date),
      description,
      category
    };
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: update });
    res.json({ _id: id, ...update });
  } else if (req.method === 'DELETE') {
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'Transaction deleted' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
