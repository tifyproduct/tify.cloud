import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Portfolio from '@/pages/Portfolio';
import Transactions from '@/pages/Transactions';
import News from '@/pages/News';
import Chat from '@/pages/Chat';
import InvestmentDetail from '@/pages/InvestmentDetail';
import MacroEconomic from '@/pages/MacroEconomic';
import Market from '@/pages/Market';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Helmet>
        <title>Personal Finance Tracker</title>
        <meta name="description" content="Track your personal finances, investments, and stay updated with financial news" />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/market/:marketType" element={<ProtectedRoute><Market /></ProtectedRoute>} />
          <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/macro-economic" element={<ProtectedRoute><MacroEconomic /></ProtectedRoute>} />
          <Route path="/investment/:type/:symbol" element={<ProtectedRoute><InvestmentDetail /></ProtectedRoute>} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;