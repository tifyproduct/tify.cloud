import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Wallet, Receipt, Newspaper, MessageSquare, Globe, LogOut, Store, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Wallet, label: 'Portfolio', path: '/portfolio' },
    { icon: Receipt, label: 'Transactions', path: '/transactions' },
    { icon: Globe, label: 'Macro Economic', path: '/macro-economic' },
    { icon: Newspaper, label: 'News', path: '/news' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isMarketActive = location.pathname.startsWith('/market');

  return (
    <div className="min-h-screen flex">
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 p-6 flex flex-col"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Finance Tracker</h2>
          <p className="text-sm text-white/60 mt-1">{user?.email}</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <button
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
                  isMarketActive
                    ? 'bg-emerald-500 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5" />
                  <span>Market</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <DropdownMenuItem onClick={() => navigate('/market/crypto')} className="hover:bg-white/20">Crypto</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/market/us-stock')} className="hover:bg-white/20">US Stock</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/market/id-stock')} className="hover:bg-white/20">ID Stock</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-white/70 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </motion.aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;