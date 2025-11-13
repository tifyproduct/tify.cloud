import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const BankingPortfolio = () => {
  const [accounts, setAccounts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('bankingAccounts');
    if (stored) {
      setAccounts(JSON.parse(stored));
    } else {
      const initial = [
        { id: 1, bank: 'Bank Mandiri', accountNumber: '****1234', balance: 25000000 },
        { id: 2, bank: 'BCA', accountNumber: '****5678', balance: 15000000 },
        { id: 3, bank: 'BNI', accountNumber: '****9012', balance: 10000000 },
      ];
      setAccounts(initial);
      localStorage.setItem('bankingAccounts', JSON.stringify(initial));
    }
  }, []);

  const handleAddAccount = () => {
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
        <h2 className="text-xl font-bold text-white">Banking Accounts</h2>
        <Button onClick={handleAddAccount} className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{account.bank}</h3>
            <p className="text-white/50 text-sm mb-4">{account.accountNumber}</p>
            <p className="text-2xl font-bold text-white">Rp {(account.balance / 1000000).toFixed(1)}M</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BankingPortfolio;