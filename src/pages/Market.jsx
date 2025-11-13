import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { fetchCryptoData } from '@/services/coinmarketcap';
import { fetchStockData } from '@/services/stockapi';

const Market = () => {
  const { marketType } = useParams(); // 'crypto', 'us-stock', 'id-stock'
  const navigate = useNavigate();
  const { toast } = useToast();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const marketConfig = useMemo(() => ({
    'crypto': {
      title: 'Cryptocurrency Market',
      fetcher: () => fetchCryptoData(50),
      formatter: (item) => ({
        symbol: item.symbol,
        name: item.name,
        price: item.quote.USD.price,
        change: item.quote.USD.percent_change_24h,
        marketCap: item.quote.USD.market_cap,
      }),
      type: 'crypto'
    },
    'us-stock': {
      title: 'US Stock Market',
      fetcher: () => fetchStockData('us', 50),
      formatter: (item) => ({ ...item, change: item.changePercent }),
      type: 'usStock'
    },
    'id-stock': {
      title: 'Indonesia Stock Market',
      fetcher: () => fetchStockData('id', 50),
      formatter: (item) => ({ ...item, change: item.changePercent }),
      type: 'idStock'
    }
  }), []);

  const currentConfig = marketConfig[marketType];

  const loadData = async () => {
    if (!currentConfig) return;
    setLoading(true);
    toast({ title: "Fetching Market Data...", description: `Loading top 50 ${currentConfig.title}.`});
    try {
      const rawData = await currentConfig.fetcher();
      setData(rawData.map(currentConfig.formatter));
      toast({ title: "Success!", description: "Market data updated.", variant: "success" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch market data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [marketType, currentConfig]);

  const filteredData = data.filter(item => 
    item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentConfig) {
    return <Layout><div className="text-white">Invalid market type.</div></Layout>;
  }

  return (
    <>
      <Helmet>
        <title>{currentConfig.title} - Personal Finance Tracker</title>
        <meta name="description" content={`Top 50 ${currentConfig.title} by market capitalization.`} />
      </Helmet>
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{currentConfig.title}</h1>
              <p className="text-white/70">Top 50 by market capitalization</p>
            </div>
             <div className="flex gap-2 items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <Button onClick={loadData} disabled={loading} variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="grid grid-cols-3 sm:grid-cols-4 font-semibold text-white/60 text-sm p-4 border-b border-white/10">
              <div className="col-span-1">Name</div>
              <div className="text-right">Price</div>
              <div className="text-right">24h Change</div>
              <div className="hidden sm:block text-right">Market Cap</div>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {filteredData.map(item => (
                <div
                  key={item.symbol}
                  onClick={() => navigate(`/investment/${currentConfig.type}/${item.symbol}`)}
                  className="grid grid-cols-3 sm:grid-cols-4 items-center p-4 border-b border-white/10 last:border-b-0 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="font-bold text-white">{item.symbol}</p>
                    <p className="text-sm text-white/50 truncate">{item.name}</p>
                  </div>
                  <div className="text-right font-medium text-white">
                    {marketType === 'id-stock' ? `Rp ${item.price.toLocaleString('id-ID')}` : `$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  </div>
                  <div className={`text-right font-medium flex items-center justify-end gap-1 ${item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {item.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {item.change.toFixed(2)}%
                  </div>
                  <div className="hidden sm:block text-right text-white/80">
                    {marketType === 'id-stock' ? `Rp ${(item.marketCap / 1_000_000_000_000).toFixed(2)}T` : `$${(item.marketCap / 1_000_000_000).toFixed(2)}B`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Layout>
    </>
  );
};

export default Market;