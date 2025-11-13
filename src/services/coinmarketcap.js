const CMC_API_KEY = 'demo-key'; // Users should replace with their own API key

export const fetchCryptoData = async (limit = 50) => {
  try {
    // Note: CoinMarketCap requires API key and has CORS restrictions
    // For demo purposes, we'll use mock data that simulates the API response
    // Users should implement a backend proxy or use a CORS-enabled endpoint
    
    const mockData = Array.from({ length: limit }, (_, i) => {
      const basePrice = Math.random() * 50000 + 100;
      const change24h = (Math.random() - 0.5) * 20;
      
      return {
        id: i + 1,
        symbol: i === 0 ? 'BTC' : i === 1 ? 'ETH' : i === 2 ? 'BNB' : i === 3 ? 'SOL' : i === 4 ? 'XRP' : `COIN${i + 1}`,
        name: i === 0 ? 'Bitcoin' : i === 1 ? 'Ethereum' : i === 2 ? 'Binance Coin' : i === 3 ? 'Solana' : i === 4 ? 'Ripple' : `Cryptocurrency ${i + 1}`,
        quote: {
          USD: {
            price: basePrice,
            percent_change_24h: change24h,
            market_cap: basePrice * (20000000 - i * 10000),
            volume_24h: basePrice * 50000
          }
        }
      };
    });

    return mockData;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
};

export const fetchCryptoDetail = async (symbol) => {
  try {
    const basePrice = symbol === 'BTC' ? 65000 : symbol === 'ETH' ? 3500 : Math.random() * 1000 + 1;
    const change24h = (Math.random() - 0.5) * 10;
    const marketCap = basePrice * (symbol === 'BTC' ? 21000000 : 120000000);
    const maxSupply = symbol === 'BTC' ? 21000000 : 120200000;
    const fullyDilutedValuation = basePrice * maxSupply;
    
    return {
      symbol,
      name: symbol === 'BTC' ? 'Bitcoin' : symbol === 'ETH' ? 'Ethereum' : `${symbol} Coin`,
      price: basePrice,
      change24h,
      marketCap: marketCap,
      fullyDilutedValuation,
      fdvRatio: marketCap / fullyDilutedValuation,
      volume24h: basePrice * 50000,
      circulatingSupply: 19000000,
      maxSupply: maxSupply,
      high24h: basePrice * 1.05,
      low24h: basePrice * 0.95,
      btcDominance: symbol === 'BTC' ? 52.34 : 18.11,
      fearGreedIndex: 38,
    };
  } catch (error) {
    console.error('Error fetching crypto detail:', error);
    return null;
  }
};