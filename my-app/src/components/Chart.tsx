import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: any[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {

  const aggregatedData = data.reduce((acc: any, item: any) => {
    acc[item.Make] = (acc[item.Make] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(aggregatedData).map(([Make, Count]) => ({
    Make,
    Count,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Make" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
