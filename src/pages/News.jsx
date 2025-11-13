import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import NewsCard from '@/components/news/NewsCard';
import { fetchNews } from '@/services/newsapi';
import { useToast } from '@/components/ui/use-toast';

const News = () => {
  const [activeTab, setActiveTab] = useState('finance');
  const [news, setNews] = useState({
    finance: [],
    parenting: [],
    trending: []
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const [financeNews, parentingNews, trendingNews] = await Promise.all([
        fetchNews('finance'),
        fetchNews('parenting'),
        fetchNews('trending')
      ]);

      setNews({
        finance: financeNews,
        parenting: parentingNews,
        trending: trendingNews
      });

      toast({
        title: "News Updated! 📰",
        description: "Latest articles loaded successfully",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not fetch latest news. Using cached data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>News - Personal Finance Tracker</title>
        <meta name="description" content="Stay updated with finance, parenting, and trending news" />
      </Helmet>
      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">News</h1>
              <p className="text-white/70">Stay informed with the latest updates</p>
            </div>
            <Button 
              onClick={loadNews} 
              disabled={loading}
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh News
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10">
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="parenting">Parenting</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
            
            <TabsContent value="finance">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {news.finance.map((article, idx) => (
                  <NewsCard key={idx} article={article} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="parenting">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {news.parenting.map((article, idx) => (
                  <NewsCard key={idx} article={article} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trending">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {news.trending.map((article, idx) => (
                  <NewsCard key={idx} article={article} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </Layout>
    </>
  );
};

export default News;