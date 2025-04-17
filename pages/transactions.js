import { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from '../components/TransactionForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [error, setError] = useState('');
  const predefinedCategories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('/api/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch transactions');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = async (transaction) => {
    try {
      await axios.post('/api/transactions', transaction);
      fetchTransactions();
    } catch (err) {
      console.error(err);
      setError('Failed to add transaction');
    }
  };

  const handleUpdate = async (transaction) => {
    try {
      await axios.put(`/api/transactions/${transaction._id}`, transaction);
      setEditingTransaction(null);
      fetchTransactions();
    } catch (err) {
      console.error(err);
      setError('Failed to update transaction');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.error(err);
      setError('Failed to delete transaction');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      <TransactionForm 
        onSubmit={editingTransaction ? handleUpdate : handleAdd}
        predefinedCategories={predefinedCategories}
        initialData={editingTransaction}
        key={editingTransaction ? editingTransaction._id : 'new'}
      />
      
      <hr className="my-4" />
      
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t._id}>
              <td className="p-2 border">{new Date(t.date).toLocaleDateString()}</td>
              <td className="p-2 border">${t.amount.toFixed(2)}</td>
              <td className="p-2 border">{t.category}</td>
              <td className="p-2 border">{t.description}</td>
              <td className="p-2 border">
                <Button variant="outline" className="mr-2" onClick={() => setEditingTransaction(t)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(t._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Link href="/">
        <a className="text-blue-500 underline mt-4 inline-block">Back to Dashboard</a>
      </Link>
    </div>
  );
}
