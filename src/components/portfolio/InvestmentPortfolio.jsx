import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Plus, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { fetchCryptoData } from '@/services/coinmarketcap';
import { fetchStockData } from '@/services/stockapi';

const InvestmentPortfolio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [investments, setInvestments] = useState({
    crypto: [],
    usStock: [],
    idStock: []
  });
  const [trending, setTrending] = useState({
    crypto: [],
    usStock: [],
    idStock: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInvestments();
    loadTrendingData();
  }, []);

  const loadInvestments = () => {
    const stored = localStorage.getItem('userInvestments');
    if (stored) {
      setInvestments(JSON.parse(stored));
    } else {
      const initial = {
        crypto: [
          { symbol: 'BTC', name: 'Bitcoin', amount: 0.5, price: 45000, cost: 40000, profit: 2500 },
          { symbol: 'ETH', name: 'Ethereum', amount: 5, price: 3000, cost: 2800, profit: 1000 },
        ],
        usStock: [
          { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 180, cost: 170, profit: 500 },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 20, price: 140, cost: 135, profit: 100 },
        ],
        idStock: [
          { symbol: 'BBCA', name: 'Bank Central Asia', shares: 1000, price: 8500, cost: 8000, profit: 500000 },
          { symbol: 'TLKM', name: 'Telkom Indonesia', shares: 2000, price: 3500, cost: 3300, profit: 400000 },
        ]
      };
      setInvestments(initial);
      localStorage.setItem('userInvestments', JSON.stringify(initial));
    }
  };

  const loadTrendingData = async () => {
    setLoading(true);
    try {
      const [cryptoData, usStockData, idStockData] = await Promise.all([
        fetchCryptoData(50),
        fetchStockData('us', 50),
        fetchStockData('id', 50)
      ]);

      setTrending({
        crypto: cryptoData.map(coin => ({
          symbol: coin.symbol,
          name: coin.name,
          price: coin.quote.USD.price,
          change: coin.quote.USD.percent_change_24h
        })),
        usStock: usStockData,
        idStock: idStockData
      });

      toast({
        title: "Data Updated! 📊",
        description: "Latest market prices loaded successfully",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not fetch latest prices. Using cached data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddInvestment = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const renderHoldings = (holdings, type) => (
    <div className="grid gap-4 md:grid-cols-2">
      {holdings.map((holding) => {
        const currentValue = type === 'crypto' 
          ? holding.amount * holding.price 
          : holding.shares * holding.price;
        const profitLoss = holding.profit;
        const profitPercent = (profitLoss / (currentValue - profitLoss)) * 100;

        return (
          <div
            key={holding.symbol}
            onClick={() => navigate(`/investment/${type}/${holding.symbol}`)}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{holding.symbol}</h3>
                <p className="text-white/50 text-sm">{holding.name}</p>
              </div>
              <div className={`flex items-center gap-1 ${profitLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {profitLoss >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm">{profitPercent.toFixed(2)}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/70 text-sm">Current Value</span>
                <span className="text-white font-medium">
                  {type === 'idStock' ? `Rp ${(currentValue / 1000).toFixed(0)}K` : `$${currentValue.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70 text-sm">P/L</span>
                <span className={`font-medium ${profitLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {profitLoss >= 0 ? '+' : ''}
                  {type === 'idStock' ? `Rp ${(profitLoss / 1000).toFixed(0)}K` : `$${profitLoss.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderTrending = (stocks, type) => (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {stocks.map((stock) => (
        <div
          key={stock.symbol}
          onClick={() => navigate(`/investment/${type}/${stock.symbol}`)}
          className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
        >
          <div>
            <p className="text-white font-medium">{stock.symbol}</p>
            <p className="text-white/50 text-sm">{stock.name}</p>
          </div>
          <div className="text-right">
            <p className="text-white font-medium">
              {type === 'idStock' ? `Rp ${stock.price.toFixed(0)}` : `$${stock.price.toFixed(2)}`}
            </p>
            <p className={`text-sm ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
              {type === 'crypto' ? '%' : ''}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Investment Portfolio</h2>
        <div className="flex gap-2">
          <Button 
            onClick={loadTrendingData} 
            disabled={loading}
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Prices
          </Button>
          <Button onClick={handleAddInvestment} className="bg-emerald-500 hover:bg-emerald-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Investment
          </Button>
        </div>
      </div>

      <Tabs defaultValue="crypto" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10">
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="usStock">US Stock</TabsTrigger>
          <TabsTrigger value="idStock">ID Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="crypto" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">My Holdings</h3>
            {renderHoldings(investments.crypto, 'crypto')}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Top 50 Trending (Live Prices)</h3>
            {trending.crypto.length > 0 ? renderTrending(trending.crypto, 'crypto') : (
              <div className="text-center text-white/50 py-8">Loading crypto prices...</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="usStock" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">My Holdings</h3>
            {renderHoldings(investments.usStock, 'usStock')}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Top 50 Trending (Live Prices)</h3>
            {trending.usStock.length > 0 ? renderTrending(trending.usStock, 'usStock') : (
              <div className="text-center text-white/50 py-8">Loading stock prices...</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="idStock" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">My Holdings</h3>
            {renderHoldings(investments.idStock, 'idStock')}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Top 50 Trending (Live Prices)</h3>
            {trending.idStock.length > 0 ? renderTrending(trending.idStock, 'idStock') : (
              <div className="text-center text-white/50 py-8">Loading stock prices...</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default InvestmentPortfolio;