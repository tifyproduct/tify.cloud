import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PortfolioSummary = ({ data }) => {
  const chartData = [
    { name: 'Banking', value: data.banking.balance, color: '#3b82f6' },
    { name: 'Investment', value: data.investment.value, color: '#10b981' },
    { name: 'Debt', value: data.debt.total, color: '#ef4444' },
  ];

  const totalAssets = data.banking.balance + data.investment.value;
  const netWorth = totalAssets - data.debt.total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">Portfolio Distribution</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `Rp ${(value / 1000000).toFixed(1)}M`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-white/70 text-sm mb-1">Total Assets</p>
            <p className="text-2xl font-bold text-white">Rp {(totalAssets / 1000000).toFixed(1)}M</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-white/70 text-sm mb-1">Net Worth</p>
            <p className="text-2xl font-bold text-emerald-400">Rp {(netWorth / 1000000).toFixed(1)}M</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioSummary;