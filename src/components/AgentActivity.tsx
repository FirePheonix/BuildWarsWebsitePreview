import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Target } from 'lucide-react';

interface AgentActivityProps {
  projects: any[];
}

export const AgentActivity: React.FC<AgentActivityProps> = ({ projects }) => {
  const getEngagementData = () => {
    const games = projects.filter(p => p.category?.toLowerCase() === 'game').length;
    const webApps = projects.filter(p => p.category?.toLowerCase() !== 'game').length;
    const total = projects.length;
    
    return {
      high: games,
      medium: webApps,
      low: Math.max(0, 4 - total), // remaining slots
    };
  };

  const engagement = getEngagementData();

  const EngagementBar = ({ level, count, maxCount = 4 }: { level: string; count: number; maxCount?: number }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs text-gray-400 uppercase">{level} Engagement</span>
        <span className="font-mono text-terminal-green font-bold">{count}</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: maxCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`h-2 flex-1 rounded-sm ${
              i < count 
                ? level === 'HIGH' 
                  ? 'bg-terminal-green' 
                  : level === 'MEDIUM' 
                    ? 'bg-terminal-blue' 
                    : 'bg-terminal-orange'
                : 'bg-gray-800'
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-console-bg border border-console-border rounded-lg p-6 h-full"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-terminal-blue rounded-full animate-pulse"></div>
        <h2 className="font-mono text-terminal-blue font-semibold tracking-wide">
          AGENT ACTIVITY
        </h2>
      </div>

      {/* Activity Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-center p-3 bg-gray-900 border border-gray-800 rounded-lg"
        >
          <div className="flex items-center justify-center mb-2">
            <Zap className="w-5 h-5 text-terminal-green" />
          </div>
          <div className="font-mono text-2xl font-bold text-terminal-green mb-1">
            {engagement.high}
          </div>
          <div className="font-mono text-xs text-gray-400">High</div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-center p-3 bg-gray-900 border border-gray-800 rounded-lg"
        >
          <div className="flex items-center justify-center mb-2">
            <Shield className="w-5 h-5 text-terminal-blue" />
          </div>
          <div className="font-mono text-2xl font-bold text-terminal-blue mb-1">
            {engagement.medium}
          </div>
          <div className="font-mono text-xs text-gray-400">Medium</div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-center p-3 bg-gray-900 border border-gray-800 rounded-lg"
        >
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-terminal-orange" />
          </div>
          <div className="font-mono text-2xl font-bold text-terminal-orange mb-1">
            {engagement.low}
          </div>
          <div className="font-mono text-xs text-gray-400">Low</div>
        </motion.div>
      </div>

      {/* Engagement Bars */}
      <div className="space-y-4">
        <EngagementBar level="HIGH" count={engagement.high} />
        <EngagementBar level="MEDIUM" count={engagement.medium} />
        <EngagementBar level="LOW" count={engagement.low} />
      </div>
    </motion.div>
  );
};
