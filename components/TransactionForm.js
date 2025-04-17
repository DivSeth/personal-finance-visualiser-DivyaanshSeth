import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

export default function TransactionForm({ onSubmit, predefinedCategories, initialData }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState(predefinedCategories[0]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setAmount(initialData.amount);
      setDate(new Date(initialData.date).toISOString().split("T")[0]);
      setCategory(initialData.category);
      setDescription(initialData.description);
    } else {
      setAmount('');
      setDate('');
      setCategory(predefinedCategories[0]);
      setDescription('');
    }
  }, [initialData, predefinedCategories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }
    if (!date) {
      setError('Please enter a date');
      return;
    }
    if (!description) {
      setError('Please enter a description');
      return;
    }
    setError('');
    
    const transactionData = {
      amount: parseFloat(amount),
      date,
      category,
      description
    };
    if (initialData && initialData._id) {
      transactionData._id = initialData._id;
    }
    onSubmit(transactionData);
    if (!initialData) {
      setAmount('');
      setDate('');
      setCategory(predefinedCategories[0]);
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Transaction' : 'Add Transaction'}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="mb-4">
        <Label htmlFor="amount" className="block mb-1">Amount</Label>
        <Input 
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="date" className="block mb-1">Date</Label>
        <Input 
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="mb-4">
        <Label htmlFor="category" className="block mb-1">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <span>{category}</span>
          </SelectTrigger>
          <SelectContent>
            {predefinedCategories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4">
        <Label htmlFor="description" className="block mb-1">Description</Label>
        <Input 
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
        />
      </div>
      
      <Button type="submit" className="w-full">
        {initialData ? 'Update Transaction' : 'Add Transaction'}
      </Button>
    </form>
  );
}
