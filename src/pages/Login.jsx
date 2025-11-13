import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LogIn, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
const Login = () => {
  const [email, setEmail] = useState('');
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleSubmit = e => {
    e.preventDefault();
    if (login(email)) {
      toast({
        title: "Welcome back! 🎉",
        description: "Successfully logged in"
      });
      navigate('/');
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid user ID. Please try again.",
        variant: "destructive"
      });
    }
  };
  return <>
      <Helmet>
        <title>Login - Personal Finance Tracker</title>
        <meta name="description" content="Login to your personal finance tracking dashboard" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center justify-center mb-8">
              <TrendingUp className="w-12 h-12 text-emerald-400 mr-3" />
              <h1 className="text-3xl font-bold text-white">Tify Cloud</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">User ID</Label>
                <Input id="email" type="text" placeholder="Enter your user ID" value={email} onChange={e => setEmail(e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-white/50" required />
                <p className="text-xs text-white/60">Hint: your name</p>
              </div>

              <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </>;
};
export default Login;