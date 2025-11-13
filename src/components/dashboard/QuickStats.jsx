import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, CreditCard } from 'lucide-react';

const QuickStats = ({ data }) => {
  const stats = [
    {
      icon: Wallet,
      label: 'Total Banking',
      value: `Rp ${(data.banking.balance / 1000000).toFixed(1)}M`,
      color: 'bg-blue-500',
    },
    {
      icon: TrendingUp,
      label: 'Total Investment',
      value: `Rp ${(data.investment.value / 1000000).toFixed(1)}M`,
      color: 'bg-emerald-500',
      subtext: `+Rp ${(data.investment.profit / 1000000).toFixed(1)}M`,
    },
    {
      icon: CreditCard,
      label: 'Total Debt',
      value: `Rp ${(data.debt.total / 1000000).toFixed(1)}M`,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-white/70 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            {stat.subtext && <p className="text-emerald-400 text-sm mt-1">{stat.subtext}</p>}
          </motion.div>
        );
      })}
    </div>
  );
};

export default QuickStats;