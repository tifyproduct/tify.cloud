import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PortfolioSummary from '@/components/dashboard/PortfolioSummary';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import QuickStats from '@/components/dashboard/QuickStats';

const Dashboard = () => {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('portfolioData');
    if (stored) {
      setPortfolioData(JSON.parse(stored));
    } else {
      const initial = {
        banking: { balance: 50000000, accounts: 3 },
        investment: { value: 75000000, profit: 5000000, holdings: 12 },
        debt: { total: 25000000, accounts: 2 }
      };
      setPortfolioData(initial);
      localStorage.setItem('portfolioData', JSON.stringify(initial));
    }
  }, []);

  if (!portfolioData) return null;

  return (
    <>
      <Helmet>
        <title>Dashboard - Personal Finance Tracker</title>
        <meta name="description" content="View your financial dashboard and portfolio summary" />
      </Helmet>
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-white/70">Welcome back! Here's your financial overview</p>
          </div>

          <QuickStats data={portfolioData} />
          <PortfolioSummary data={portfolioData} />
          <RecentTransactions />
        </motion.div>
      </Layout>
    </>
  );
};

export default Dashboard;