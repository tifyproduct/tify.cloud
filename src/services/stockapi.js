export const fetchStockData = async (market = 'us', limit = 50) => {
  try {
    const mockData = Array.from({ length: limit }, (_, i) => {
      const basePrice = market === 'us' ? Math.random() * 500 : Math.random() * 10000;
      const change = (Math.random() - 0.5) * (market === 'us' ? 10 : 500);
      
      const usStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'JPM', 'V', 'WMT'];
      const idStocks = ['BBCA', 'TLKM', 'BBRI', 'ASII', 'BMRI', 'UNVR', 'ICBP', 'INDF', 'KLBF', 'GGRM'];
      
      const symbol = market === 'us' 
        ? (i < usStocks.length ? usStocks[i] : `US${i + 1}`)
        : (i < idStocks.length ? idStocks[i] : `ID${i + 1}`);
      
      const name = market === 'us'
        ? (i < usStocks.length ? `${symbol} Inc.` : `US Stock ${i + 1}`)
        : (i < idStocks.length ? `${symbol} Tbk` : `ID Stock ${i + 1}`);

      return {
        symbol,
        name,
        price: basePrice,
        change,
        changePercent: (change / basePrice) * 100,
        volume: Math.floor(Math.random() * 10000000),
        marketCap: basePrice * Math.floor(Math.random() * 1000000000)
      };
    });

    return mockData;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
};

export const fetchStockDetail = async (symbol, market = 'us') => {
  try {
    const basePrice = market === 'us' ? 150 : 8500;
    const change = (Math.random() - 0.5) * (market === 'us' ? 5 : 200);
    
    return {
      symbol,
      name: `${symbol} ${market === 'us' ? 'Inc.' : 'Tbk'}`,
      price: basePrice,
      change,
      changePercent: (change / basePrice) * 100,
      open: basePrice * 0.98,
      high: basePrice * 1.02,
      low: basePrice * 0.97,
      volume: Math.floor(Math.random() * 10000000),
      marketCap: basePrice * 1000000000,
      pe: 25.5,
      eps: basePrice / 25.5,
      dividend: 2.5,
      beta: 1.2
    };
  } catch (error) {
    console.error('Error fetching stock detail:', error);
    return null;
  }
};