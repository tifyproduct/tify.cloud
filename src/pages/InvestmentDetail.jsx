import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FundamentalAnalysis from '@/components/investment/FundamentalAnalysis';
import TechnicalAnalysis from '@/components/investment/TechnicalAnalysis';
import { fetchCryptoDetail } from '@/services/coinmarketcap';
import { fetchStockDetail } from '@/services/stockapi';
import { useToast } from '@/components/ui/use-toast';

const InvestmentDetail = () => {
  const { type, symbol } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      let detailData;
      if (type === 'crypto') {
        detailData = await fetchCryptoDetail(symbol);
      } else {
        const market = type === 'usStock' ? 'us' : 'id';
        detailData = await fetchStockDetail(symbol, market);
      }
      
      setData({
        ...detailData,
        type
      });

      toast({
        title: "Data Loaded! 📊",
        description: `Latest ${symbol} data retrieved successfully`,
      });
    } catch (error) {
      toast({
        title: "Load Failed",
        description: "Could not fetch latest data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [symbol, type]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          <RefreshCw className="w-8 h-8 text-white animate-spin" />
        </div>
      </Layout>
    )
  }

  if (!data) return <Layout><div className="text-white text-center">Could not load data for {symbol}.</div></Layout>;

  const changePercent = type === 'crypto' ? data.change24h : data.changePercent;
  const change = type === 'crypto' ? (data.price * data.change24h / 100) : data.change;

  return (
    <>
      <Helmet>
        <title>{data.symbol} - Investment Detail</title>
        <meta name="description" content={`View detailed analysis for ${data.symbol}`} />
      </Helmet>
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              onClick={loadData} 
              disabled={loading}
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">{data.symbol}</h1>
                <p className="text-white/70">{data.name}</p>
                <span className="text-xs text-white/50 uppercase">{type === 'crypto' ? 'Cryptocurrency' : type === 'usStock' ? 'US Stock' : 'ID Stock'}</span>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">
                  {type === 'idStock' ? `Rp ${data.price.toFixed(0)}` : `$${data.price.toFixed(2)}`}
                </p>
                <div className={`flex items-center gap-1 justify-end ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/60 text-sm mb-1">24h High</p>
                <p className="text-white font-bold">
                  {type === 'idStock' ? `Rp ${data.high24h?.toFixed(0) || data.high?.toFixed(0)}` : `$${data.high24h?.toFixed(2) || data.high?.toFixed(2)}`}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/60 text-sm mb-1">24h Low</p>
                <p className="text-white font-bold">
                  {type === 'idStock' ? `Rp ${data.low24h?.toFixed(0) || data.low?.toFixed(0)}` : `$${data.low24h?.toFixed(2) || data.low?.toFixed(2)}`}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/60 text-sm mb-1">Volume</p>
                <p className="text-white font-bold">
                  {type === 'crypto' 
                    ? `$${(data.volume24h / 1000000).toFixed(1)}M`
                    : `${(data.volume / 1000000).toFixed(1)}M`
                  }
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/60 text-sm mb-1">Market Cap</p>
                <p className="text-white font-bold">
                  {type === 'idStock' 
                    ? `Rp ${(data.marketCap / 1000000000000).toFixed(2)}T`
                    : `$${(data.marketCap / 1000000000).toFixed(2)}B`
                  }
                </p>
              </div>
            </div>

            <Tabs defaultValue="fundamental" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="fundamental">Fundamental</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>
              
              <TabsContent value="fundamental">
                <FundamentalAnalysis symbol={data.symbol} type={type} data={data} />
              </TabsContent>
              
              <TabsContent value="technical">
                <TechnicalAnalysis symbol={data.symbol} type={type} data={data} />
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </Layout>
    </>
  );
};

export default InvestmentDetail;