import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const IndicatorCard = ({ seriesId, data }) => {
  const isLoading = !data;
  const hasError = data?.error;
  const hasData = !isLoading && !hasError && data.observations && data.observations.length > 0;

  const indicatorDetails = {
    'WALCL': 'Fed Balance Sheet',
    'USM2': 'M2 Money Supply',
    'FEDFUNDS': 'Effective Federal Funds Rate',
    'CPILFESL': 'Core CPI',
    'PCE': 'Personal Consumption Expenditures',
    'DXY': 'U.S. Dollar Index',
    'VIXCLS': 'VIX Volatility Index',
    'DGS10': '10-Year Treasury Yield'
  };

  const getLatestValue = () => {
    if (!hasData) return 'N/A';
    const latestPoint = data.observations[data.observations.length - 1];
    return parseFloat(latestPoint.value).toLocaleString();
  };

  const getLatestDate = () => {
    if (!hasData) return '';
    return data.observations[data.observations.length - 1].date;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{indicatorDetails[seriesId] || seriesId}</h3>
          <p className="text-sm text-white/50">{seriesId}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-400">{getLatestValue()}</p>
          <p className="text-xs text-white/50">{getLatestDate()}</p>
        </div>
      </div>
      <div className="h-40">
        {isLoading && <div className="flex items-center justify-center h-full text-white/50">Loading chart...</div>}
        {hasError && <div className="flex items-center justify-center h-full text-red-400">Error loading data</div>}
        {hasData && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.observations} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff20' }}
                labelStyle={{ color: '#ffffff' }}
                formatter={(value) => [parseFloat(value).toLocaleString(), 'Value']}
              />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
              <XAxis dataKey="date" hide={true} />
              <YAxis domain={['auto', 'auto']} hide={true} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default IndicatorCard;