import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function CategoryPieChart({ transactions }) {
  const categoryMap = {};
  transactions.forEach(t => {
    if (categoryMap[t.category]) {
      categoryMap[t.category] += t.amount;
    } else {
      categoryMap[t.category] = t.amount;
    }
  });

  const data = Object.keys(categoryMap).map(category => ({
    name: category,
    value: categoryMap[category]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie dataKey="value" data={data} innerRadius={60} outerRadius={80} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
