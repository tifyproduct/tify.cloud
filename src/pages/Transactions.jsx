import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import TransactionList from '@/components/transactions/TransactionList';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      const initial = [
        { id: 1, date: '2025-11-10', category: 'banking', type: 'deposit', amount: 5000000, description: 'Salary' },
        { id: 2, date: '2025-11-09', category: 'investment', type: 'buy', amount: 10000000, description: 'BTC Purchase' },
        { id: 3, date: '2025-11-08', category: 'debt', type: 'payment', amount: 2000000, description: 'Credit Card Payment' },
        { id: 4, date: '2025-11-07', category: 'banking', type: 'withdrawal', amount: 1500000, description: 'ATM Withdrawal' },
        { id: 5, date: '2025-11-06', category: 'investment', type: 'sell', amount: 8000000, description: 'AAPL Sale' },
      ];
      setTransactions(initial);
      localStorage.setItem('transactions', JSON.stringify(initial));
    }
  }, []);

  const filterTransactions = (category) => {
    if (category === 'all') return transactions;
    return transactions.filter(t => t.category === category);
  };

  return (
    <>
      <Helmet>
        <title>Transactions - Personal Finance Tracker</title>
        <meta name="description" content="View your transaction history across all categories" />
      </Helmet>
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
            <p className="text-white/70">Track all your financial activities</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="banking">Banking</TabsTrigger>
              <TabsTrigger value="investment">Investment</TabsTrigger>
              <TabsTrigger value="debt">Debt</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <TransactionList transactions={filterTransactions('all')} />
            </TabsContent>
            
            <TabsContent value="banking">
              <TransactionList transactions={filterTransactions('banking')} />
            </TabsContent>
            
            <TabsContent value="investment">
              <TransactionList transactions={filterTransactions('investment')} />
            </TabsContent>
            
            <TabsContent value="debt">
              <TransactionList transactions={filterTransactions('debt')} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </Layout>
    </>
  );
};

export default Transactions;