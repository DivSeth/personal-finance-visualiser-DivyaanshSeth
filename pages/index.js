import { useState, useEffect } from 'react';
import axios from 'axios';
import MonthlyBarChart from '../components/Charts/MonthlyBarChart';
import CategoryPieChart from '../components/Charts/CategoryPieChart';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const predefinedCategories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('/api/transactions');
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>Loading...</p>;

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

  const categoryBreakdown = predefinedCategories.map(cat => {
    const total = transactions
      .filter(t => t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0);
    return { category: cat, total };
  });

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p>${totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {categoryBreakdown.map(item => (
                <li key={item.category}>
                  {item.category}: ${item.total.toFixed(2)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {recentTransactions.map(t => (
                <li key={t._id}>
                  {new Date(t.date).toLocaleDateString()} - ${t.amount.toFixed(2)} - {t.description}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
        <MonthlyBarChart transactions={transactions} />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Expenses by Category</h2>
        <CategoryPieChart transactions={transactions} />
      </div>
      
      <Link href="/transactions"className="text-blue-500 underline">
        Manage Transactions 
      </Link>
    </div>
  );
}
