import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import MacroEconomicTab from '@/components/macro/MacroEconomicTab';

const MacroEconomic = () => {
  const [activeTab, setActiveTab] = useState('us');
  const usIndicators = ['WALCL', 'USM2', 'FEDFUNDS', 'CPILFESL', 'PCE', 'DXY', 'VIXCLS', 'DGS10'];

  return (
    <>
      <Helmet>
        <title>Macro Economic - Personal Finance Tracker</title>
        <meta name="description" content="Track key macro economic indicators from around the world" />
      </Helmet>
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Macro Economic Data</h1>
            <p className="text-white/70">Key indicators from FRED (Federal Reserve Economic Data)</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10">
              <TabsTrigger value="us">US</TabsTrigger>
              <TabsTrigger value="euro">EURO</TabsTrigger>
              <TabsTrigger value="id">ID</TabsTrigger>
            </TabsList>
            
            <TabsContent value="us">
              <MacroEconomicTab region="US" indicators={usIndicators} />
            </TabsContent>
            
            <TabsContent value="euro">
               <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center mt-4">
                <h3 className="text-xl font-bold text-white">🚧 Coming Soon</h3>
                <p className="text-white/60 mt-2">EURO economic indicators will be available in a future update. You can request this feature in your next prompt!</p>
              </div>
            </TabsContent>
            
            <TabsContent value="id">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center mt-4">
                <h3 className="text-xl font-bold text-white">🚧 Coming Soon</h3>
                <p className="text-white/60 mt-2">Indonesian economic indicators will be available in a future update. You can request this feature in your next prompt!</p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </Layout>
    </>
  );
};

export default MacroEconomic;