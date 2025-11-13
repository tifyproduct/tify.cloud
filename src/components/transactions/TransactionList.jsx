import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TransactionList = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center">
        <p className="text-white/50">No transactions found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
    >
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                transaction.type === 'deposit' || transaction.type === 'buy' ? 'bg-emerald-500/20' : 'bg-red-500/20'
              }`}>
                {transaction.type === 'deposit' || transaction.type === 'buy' ? (
                  <ArrowDownRight className="w-6 h-6 text-emerald-400" />
                ) : (
                  <ArrowUpRight className="w-6 h-6 text-red-400" />
                )}
              </div>
              <div>
                <p className="text-white font-medium">{transaction.description}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-white/50 text-sm">{transaction.date}</span>
                  <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70 capitalize">
                    {transaction.category}
                  </span>
                </div>
              </div>
            </div>
            <p className={`text-xl font-bold ${
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

export default TransactionList;