import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, Share, Users, Circle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const GameHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const [selectedUsers] = useState(2);
  const [otherUsers] = useState(174);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-console-border bg-console-bg relative overflow-hidden"
    >
      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-0.5 bg-terminal-green opacity-30 animate-scan"></div>
      </div>

      <div className="container mx-auto px-6 py-4">
        {/* Top Row - Share and User Info */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-2 text-terminal-blue">
            <Share className="w-4 h-4" />
            <span className="font-mono">Share Simulation</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-terminal-green">
              <div className="flex items-center gap-2">
                <Circle className="w-2 h-2 fill-current" />
                <span className="font-mono">{selectedUsers} Selected Users</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Circle className="w-2 h-2 fill-current" />
                <span className="font-mono">{otherUsers} Other Users</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-terminal-blue">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-mono text-xs hidden md:inline">
                  AGENT: {user?.email?.split('@')[0]?.toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-terminal-red hover:text-red-400 transition-colors font-mono text-xs"
                title="Terminate Session"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">LOGOUT</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-4xl md:text-5xl font-bold tracking-wider text-terminal-green mb-2"
          >
            <span className="inline-block">DUALITE</span>{' '}
            <span className="inline-block text-terminal-blue">BUILD</span>{' '}
            <span className="inline-block text-terminal-orange">WARS</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-mono text-terminal-blue text-sm"
          >
            <span className="animate-blink">█</span> WEBSITE CONTROL INTERFACE - {currentTime.toLocaleTimeString()}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="font-mono text-gray-400 text-xs mt-2 max-w-2xl mx-auto"
          >
            // ACCESSING CLASSIFIED PROJECT DATABASE - ELITE DEVELOPER WEBSITES ONLY
          </motion.p>
        </div>
      </div>
    </motion.header>
  );
};
