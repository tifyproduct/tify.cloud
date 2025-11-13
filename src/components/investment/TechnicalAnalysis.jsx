import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TechnicalAnalysis = ({ symbol, type, data }) => {
  const chartData = Array.from({ length: 90 }, (_, i) => {
    const basePrice = data.price || 150;
    const variance = basePrice * 0.15;
    return {
      date: `Day ${i + 1}`,
      price: basePrice + (Math.random() - 0.5) * variance * (1 + i/90)
    };
  });

  const indicators = {
    rsi: '58.2 (Neutral)',
    macd: Math.random() > 0.5 ? 'Bullish Cross' : 'Bearish Cross',
    ema50: data.price ? (data.price * 0.98).toFixed(2) : '148.2',
    ema100: data.price ? (data.price * 0.95).toFixed(2) : '142.8',
    support: data.low || data.low24h ? (type === 'idStock' ? `Rp ${(data.low || data.low24h).toFixed(0)}` : `$${(data.low || data.low24h).toFixed(2)}`) : 'N/A',
    resistance: data.high || data.high24h ? (type === 'idStock' ? `Rp ${(data.high || data.high24h).toFixed(0)}` : `$${(data.high || data.high24h).toFixed(2)}`) : 'N/A'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 mt-6"
    >
      <div className="bg-white/5 rounded-xl p-4">
        <h3 className="text-white font-semibold mb-4">Price Chart (90 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="date" stroke="#ffffff60" />
            <YAxis stroke="#ffffff60" domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff20' }}
              labelStyle={{ color: '#ffffff' }}
              formatter={(value) => type === 'idStock' ? `Rp ${value.toFixed(0)}` : `$${value.toFixed(2)}`}
            />
            <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(indicators).map(([key, value]) => (
          <div key={key} className="bg-white/5 rounded-xl p-4">
            <p className="text-white/60 text-sm mb-1 uppercase">{key}</p>
            <p className="text-xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechnicalAnalysis;