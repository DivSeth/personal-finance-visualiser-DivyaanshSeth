import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('transactions');

  if (req.method === 'GET') {
    const transactions = await collection.find({}).sort({ date: -1 }).toArray();
    res.json(transactions);
  } else if (req.method === 'POST') {
    const { amount, date, description, category } = req.body;
    if (!amount || !date || !description || !category) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
    const transaction = { 
      amount: parseFloat(amount),
      date: new Date(date),
      description,
      category
    };
    const result = await collection.insertOne(transaction);
    const insertedTransaction = { ...transaction, _id: result.insertedId };
    res.json(insertedTransaction);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
