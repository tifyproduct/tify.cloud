const NEWS_API_KEY = 'demo-key'; // Users should replace with their own API key
const NEWS_BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (category = 'business', pageSize = 10) => {
  try {
    // Note: NewsAPI has CORS restrictions for browser requests
    // For demo purposes, we'll use mock data that simulates the API response
    // Users should implement a backend proxy or use a CORS-enabled endpoint
    
    const categories = {
      finance: [
        { title: 'Global Markets Rally on Economic Data', source: 'Financial Times', date: '2025-11-13', description: 'Stock markets worldwide surge as positive economic indicators boost investor confidence.' },
        { title: 'Federal Reserve Signals Rate Cut Possibility', source: 'Bloomberg', date: '2025-11-13', description: 'Central bank hints at potential monetary policy shift in upcoming meeting.' },
        { title: 'Tech Stocks Lead Market Gains', source: 'Reuters', date: '2025-11-12', description: 'Technology sector outperforms as AI investments continue to drive growth.' },
        { title: 'Cryptocurrency Market Cap Hits New Milestone', source: 'CoinDesk', date: '2025-11-12', description: 'Digital assets reach unprecedented valuation amid institutional adoption.' },
        { title: 'Banking Sector Reports Strong Q4 Earnings', source: 'Wall Street Journal', date: '2025-11-11', description: 'Major financial institutions exceed analyst expectations in quarterly results.' },
      ],
      parenting: [
        { title: 'Teaching Financial Literacy to Children', source: 'Parenting Magazine', date: '2025-11-13', description: 'Expert tips on introducing money management concepts to kids at different ages.' },
        { title: 'Best Investment Accounts for Your Child\'s Future', source: 'Family Finance', date: '2025-11-12', description: 'Comprehensive guide to education savings plans and custodial accounts.' },
        { title: 'Balancing Work and Family Finances', source: 'Modern Parent', date: '2025-11-11', description: 'Strategies for managing household budgets while raising children.' },
        { title: 'Smart Saving Tips for Growing Families', source: 'Parent Today', date: '2025-11-10', description: 'Practical advice on reducing expenses without sacrificing quality of life.' },
      ],
      trending: [
        { title: 'Sustainable Investing Gains Momentum', source: 'Green Finance', date: '2025-11-13', description: 'ESG funds attract record inflows as investors prioritize environmental impact.' },
        { title: 'Real Estate Market Shows Signs of Recovery', source: 'Property News', date: '2025-11-12', description: 'Housing prices stabilize in major metropolitan areas across the country.' },
        { title: 'Artificial Intelligence Transforms Financial Services', source: 'Tech Finance', date: '2025-11-12', description: 'AI-powered tools revolutionize investment strategies and risk management.' },
        { title: 'Emerging Markets Offer New Opportunities', source: 'Global Investor', date: '2025-11-11', description: 'Developing economies present attractive returns for diversified portfolios.' },
        { title: 'Retirement Planning in the Digital Age', source: 'Future Finance', date: '2025-11-10', description: 'How technology is reshaping retirement savings and planning strategies.' },
      ]
    };

    return categories[category] || categories.finance;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};