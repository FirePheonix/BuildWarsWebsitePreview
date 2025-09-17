import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Activity } from 'lucide-react';

interface WebsiteStatusProps {
  projectCount: number;
  loading: boolean;
}

export const WebsiteStatus: React.FC<WebsiteStatusProps> = ({ projectCount, loading }) => {
  const [impactScore, setImpactScore] = useState(0);
  const [status, setStatus] = useState('INITIALIZING');

  useEffect(() => {
    if (!loading && projectCount > 0) {
      // Animate impact score based on project count
      const targetScore = Math.min(projectCount * 25, 100);
      const interval = setInterval(() => {
        setImpactScore(prev => {
          if (prev < targetScore) {
            return prev + 1;
          }
          clearInterval(interval);
          return targetScore;
        });
      }, 20);

      // Update status based on impact score
      if (targetScore >= 80) setStatus('EXCELLENT');
      else if (targetScore >= 60) setStatus('OPTIMAL');
      else if (targetScore >= 40) setStatus('ACTIVE');
      else if (targetScore > 0) setStatus('MINIMAL');
      else setStatus('CRITICAL');

      return () => clearInterval(interval);
    } else if (!loading && projectCount === 0) {
      setImpactScore(0);
      setStatus('CRITICAL');
    }
  }, [projectCount, loading]);

  const getStatusColor = () => {
    switch (status) {
      case 'EXCELLENT': return 'text-terminal-green';
      case 'OPTIMAL': return 'text-terminal-blue';
      case 'ACTIVE': return 'text-terminal-orange';
      case 'MINIMAL': return 'text-yellow-500';
      case 'CRITICAL': return 'text-terminal-red';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'EXCELLENT':
      case 'OPTIMAL':
        return <CheckCircle className="w-4 h-4" />;
      case 'ACTIVE':
      case 'MINIMAL':
        return <Activity className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-console-bg border border-console-border rounded-lg p-6 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
          <h2 className="font-mono text-terminal-green font-semibold tracking-wide">
            WEBSITE STATUS
          </h2>
        </div>
        <div className={`flex items-center gap-2 font-mono text-sm ${getStatusColor()}`}>
          {getStatusIcon()}
          <span>{status}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-gray-300 text-sm">Impact Score</span>
            <span className="font-mono text-terminal-green font-bold text-lg">
              {impactScore}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${impactScore}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                impactScore >= 80 ? 'bg-terminal-green' :
                impactScore >= 60 ? 'bg-terminal-blue' :
                impactScore >= 40 ? 'bg-terminal-orange' :
                'bg-terminal-red'
              }`}
            />
            {/* Progress bar segments */}
            <div className="absolute inset-0 flex">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="flex-1 border-r border-gray-700 last:border-r-0" />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between text-xs font-mono text-gray-500 mt-1">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-800">
          <span className="font-mono text-gray-300 text-sm">Status:</span>
          <span className={`font-mono font-bold ${getStatusColor()}`}>
            {status}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
