import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NewsCard = ({ article }) => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: article.title,
      description: article.description || "Click to read the full article",
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all cursor-pointer"
    >
      <img alt={article.title} className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1618650551428-199e32d38059" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{article.title}</h3>
        {article.description && (
          <p className="text-white/60 text-sm mb-3 line-clamp-2">{article.description}</p>
        )}
        <div className="flex items-center justify-between text-sm text-white/60">
          <span>{article.source}</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{article.date}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-emerald-400 text-sm">
          <span>Read more</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;