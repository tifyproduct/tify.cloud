import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const DebtPortfolio = () => {
  const [debts, setDebts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('debts');
    if (stored) {
      setDebts(JSON.parse(stored));
    } else {
      const initial = [
        { id: 1, type: 'Credit Card', institution: 'BCA Card', balance: 15000000, limit: 30000000, dueDate: '2025-11-25' },
        { id: 2, type: 'Personal Loan', institution: 'Bank Mandiri', balance: 10000000, monthlyPayment: 1000000, dueDate: '2025-11-20' },
      ];
      setDebts(initial);
      localStorage.setItem('debts', JSON.stringify(initial));
    }
  }, []);

  const handleAddDebt = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Debt Accounts</h2>
        <Button onClick={handleAddDebt} className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Debt
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {debts.map((debt) => (
          <div
            key={debt.id}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{debt.type}</h3>
            <p className="text-white/50 text-sm mb-4">{debt.institution}</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/70 text-sm">Balance</span>
                <span className="text-white font-medium">Rp {(debt.balance / 1000000).toFixed(1)}M</span>
              </div>
              {debt.limit && (
                <div className="flex justify-between">
                  <span className="text-white/70 text-sm">Limit</span>
                  <span className="text-white/50 text-sm">Rp {(debt.limit / 1000000).toFixed(1)}M</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-white/70 text-sm">Due Date</span>
                <span className="text-red-400 text-sm">{debt.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DebtPortfolio;