import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const {
    toast
  } = useToast();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const sendMessage = async e => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = {
      role: 'user',
      content: input
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('https://n8n.tify.cloud/webhook/30155aa7-55bc-4b4e-a9f0-02199f666de7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: input
        })
      });
      const text = await response.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }
      let botReply = Array.isArray(parsed) && parsed[0]?.output ? parsed[0].output : parsed.reply || parsed.output || parsed.message || parsed.response || parsed.body || parsed || 'Message received!';
      const botMessage = {
        role: 'bot',
        content: botReply
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: 'Connection Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
      const errorMessage = {
        role: 'bot',
        content: '⚠️ Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  return <>
      <Helmet>
        <title>Chat - Personal Finance Tracker</title>
        <meta name="description" content="Chat with our financial assistant" />
      </Helmet>
      <Layout>
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5
      }} className="h-[calc(100vh-12rem)] flex flex-col">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-white mb-2">Tify Assistant</h1>
            <p className="text-white/70">Ask me anything about your Life</p>
          </div>

          <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 overflow-y-auto mb-4">
            {messages.length === 0 ? <div className="h-full flex items-center justify-center text-white/50">
                <p>Start a conversation...</p>
              </div> : <div className="space-y-4">
                {messages.map((msg, idx) => <motion.div key={idx} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                      {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`max-w-[70%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}>
                      <p className="text-white whitespace-pre-line">{msg.content}</p>
                    </div>
                  </motion.div>)}

                {isLoading && <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="bg-blue-500/20 p-3 rounded-2xl">
                      <p className="text-white">Typing...</p>
                    </div>
                  </div>}
                <div ref={messagesEndRef} />
              </div>}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2">
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50" disabled={isLoading} />
            <Button type="submit" disabled={isLoading} className="bg-emerald-500 hover:bg-emerald-600">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </motion.div>
      </Layout>
    </>;
};
export default Chat;