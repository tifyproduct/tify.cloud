import React from 'react';
import { motion } from 'framer-motion';

const FundamentalAnalysis = ({ symbol, type, data }) => {
  const fundamentals = type === 'crypto' 
    ? {
        marketCap: data.marketCap ? `$${(data.marketCap / 1000000000).toFixed(2)}B` : 'N/A',
        fullyDilutedValuation: data.fullyDilutedValuation ? `$${(data.fullyDilutedValuation / 1000000000).toFixed(2)}B` : 'N/A',
        fdvRatio: data.fdvRatio ? data.fdvRatio.toFixed(2) : 'N/A',
        volume24h: data.volume24h ? `$${(data.volume24h / 1000000).toFixed(1)}M` : 'N/A',
        circulatingSupply: data.circulatingSupply ? `${(data.circulatingSupply / 1000000).toFixed(1)}M` : 'N/A',
        maxSupply: data.maxSupply ? `${(data.maxSupply / 1000000).toFixed(1)}M` : 'Unlimited',
        btcDominance: data.btcDominance ? `${data.btcDominance.toFixed(2)}%` : 'N/A',
        fearGreedIndex: data.fearGreedIndex ? `${data.fearGreedIndex} (Fear)` : 'N/A',
      }
    : {
        marketCap: data.marketCap ? (type === 'idStock' ? `Rp ${(data.marketCap / 1000000000).toFixed(1)}B` : `$${(data.marketCap / 1000000000).toFixed(1)}B`) : 'N/A',
        peRatio: data.pe ? data.pe.toFixed(2) : '28.5',
        eps: data.eps ? data.eps.toFixed(2) : '6.42',
        dividend: data.dividend ? `${data.dividend.toFixed(2)}%` : '0.52%',
        beta: data.beta ? data.beta.toFixed(2) : '1.2',
        volume: data.volume ? `${(data.volume / 1000000).toFixed(1)}M` : 'N/A',
      };

  const otherFactors = [
    { label: 'Google Trend', value: '78', status: 'High Interest'},
    { label: 'Supply Concern', value: 'Low', status: 'No major unlocks scheduled'},
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-6"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(fundamentals).map(([key, value]) => (
          <div key={key} className="bg-white/5 rounded-xl p-4">
            <p className="text-white/60 text-sm mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').replace('Btc', 'BTC').trim()}
            </p>
            <p className="text-xl font-bold text-white">{value}</p>
          </div>
        ))}
        {type === 'crypto' && otherFactors.map((factor) => (
           <div key={factor.label} className="bg-white/5 rounded-xl p-4">
            <p className="text-white/60 text-sm mb-1">{factor.label}</p>
            <p className="text-xl font-bold text-white">{factor.value}</p>
            <p className="text-xs text-white/50">{factor.status}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FundamentalAnalysis;