import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      const all = JSON.parse(stored);
      setTransactions(all.slice(0, 5));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
      
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                transaction.type === 'deposit' || transaction.type === 'buy' ? 'bg-emerald-500/20' : 'bg-red-500/20'
              }`}>
                {transaction.type === 'deposit' || transaction.type === 'buy' ? (
                  <ArrowDownRight className="w-5 h-5 text-emerald-400" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div>
                <p className="text-white font-medium">{transaction.description}</p>
                <p className="text-white/50 text-sm">{transaction.date}</p>
              </div>
            </div>
            <p className={`font-bold ${
              transaction.type === 'deposit' || transaction.type === 'buy' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {transaction.type === 'deposit' || transaction.type === 'buy' ? '+' : '-'}
              Rp {(transaction.amount / 1000000).toFixed(1)}M
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentTransactions;