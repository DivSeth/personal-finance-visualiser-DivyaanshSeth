import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonthlyBarChart({ transactions }) {
  const dataMap = {};
  transactions.forEach(t => {
    const dateObj = new Date(t.date);
    const month = dateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!dataMap[month]) dataMap[month] = 0;
    dataMap[month] += t.amount;
  });

  const data = Object.keys(dataMap).map(month => ({ month, total: dataMap[month] }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
