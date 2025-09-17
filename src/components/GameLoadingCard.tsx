import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, HardDrive, Wifi } from 'lucide-react';

interface GameLoadingCardProps {
  index: number;
}

export const GameLoadingCard: React.FC<GameLoadingCardProps> = ({ index }) => {
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingPhases = [
    'INITIALIZING WEBSITE...',
    'LOADING ASSETS...',
    'ESTABLISHING CONNECTION...',
    'WEBSITE READY'
  ];

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setLoadingPhase(prev => (prev + 1) % loadingPhases.length);
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 10;
      });
    }, 100);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-console-bg border border-console-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gray-900 border-b border-console-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-terminal-blue" />
          <span className="font-mono text-xs text-terminal-blue">
            WEBSITE #{index + 1}
          </span>
        </div>
        <div className="w-2 h-2 bg-terminal-blue rounded-full animate-pulse"></div>
      </div>

      {/* Loading Content */}
      <div className="h-48 bg-gray-800 relative overflow-hidden flex items-center justify-center">
        {/* Matrix-style background */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100 }}
              animate={{ y: 300 }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute text-terminal-green font-mono text-xs"
              style={{ left: `${i * 5}%` }}
            >
              {Math.random().toString(36).substring(7)}
            </motion.div>
          ))}
        </div>

        {/* Loading Indicator */}
        <div className="text-center z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-2 border-terminal-green border-t-transparent rounded-full mx-auto mb-4"
          />
          <div className="font-mono text-terminal-green text-sm">
            {loadingPhases[loadingPhase]}
          </div>
          <div className="w-32 h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
            <motion.div
              className="h-full bg-terminal-green rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3 text-terminal-blue" />
              <span className="text-gray-400">CPU</span>
            </div>
            <span className="text-terminal-green">ACTIVE</span>
          </div>
          
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <HardDrive className="w-3 h-3 text-terminal-blue" />
              <span className="text-gray-400">STORAGE</span>
            </div>
            <span className="text-terminal-green">READY</span>
          </div>
          
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Wifi className="w-3 h-3 text-terminal-blue" />
              <span className="text-gray-400">NETWORK</span>
            </div>
            <span className="text-terminal-green">CONNECTED</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
