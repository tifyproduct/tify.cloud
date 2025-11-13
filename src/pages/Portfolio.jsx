import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import BankingPortfolio from '@/components/portfolio/BankingPortfolio';
import InvestmentPortfolio from '@/components/portfolio/InvestmentPortfolio';
import DebtPortfolio from '@/components/portfolio/DebtPortfolio';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('banking');

  return (
    <>
      <Helmet>
        <title>Portfolio - Personal Finance Tracker</title>
        <meta name="description" content="Manage your banking, investment, and debt portfolio" />
      </Helmet>
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
            <p className="text-white/70">Manage your financial assets and liabilities</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10">
              <TabsTrigger value="banking">Banking</TabsTrigger>
              <TabsTrigger value="investment">Investment</TabsTrigger>
              <TabsTrigger value="debt">Debt</TabsTrigger>
            </TabsList>
            
            <TabsContent value="banking">
              <BankingPortfolio />
            </TabsContent>
            
            <TabsContent value="investment">
              <InvestmentPortfolio />
            </TabsContent>
            
            <TabsContent value="debt">
              <DebtPortfolio />
            </TabsContent>
          </Tabs>
        </motion.div>
      </Layout>
    </>
  );
};

export default Portfolio;