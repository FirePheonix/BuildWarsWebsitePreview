import { motion } from 'framer-motion';
import { Terminal, ExternalLink } from 'lucide-react';

interface GameWebsiteCardProps {
  websiteUrl: string;
  toolName: string;
  index: number;
  showTool: boolean;
}

export const GameWebsiteCard = ({ 
  websiteUrl, 
  toolName, 
  index, 
  showTool 
}: GameWebsiteCardProps) => {
  // Skip if no website URL
  if (!websiteUrl) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className="bg-console-bg border border-console-border rounded-lg p-6 flex flex-col items-center justify-center h-96 group hover:border-terminal-blue transition-all duration-300"
      >
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-700 border-dashed rounded-lg mb-4 mx-auto flex items-center justify-center group-hover:border-terminal-blue transition-colors">
            <div className="w-4 h-4 bg-gray-700 rounded-full group-hover:bg-terminal-blue transition-colors"></div>
          </div>
          <p className="font-mono text-gray-500 text-sm text-center group-hover:text-terminal-blue transition-colors">
            WEBSITE NOT<br/>AVAILABLE
          </p>
          <div className="mt-2 text-xs font-mono text-gray-600">
            DEPLOYMENT_FAILED
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-console-bg border border-console-border rounded-lg overflow-hidden hover:border-terminal-green transition-all duration-300 group relative"
    >
      {/* Website Classification Header */}
      <div className="bg-gray-900 border-b border-console-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-terminal-green" />
          <span className="font-mono text-xs text-terminal-green">
            WEBSITE #{String.fromCharCode(65 + index)} {/* A, B, C, D */}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {showTool && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-2 py-1 rounded-full text-xs font-mono font-bold bg-terminal-blue bg-opacity-20 text-terminal-blue border border-terminal-blue"
            >
              {toolName.toUpperCase()}
            </motion.span>
          )}
          <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
          <a 
            href={websiteUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-terminal-blue hover:text-terminal-green transition-colors"
            title={`Open website in a new tab`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Full Interactive Preview Section */}
      <div className="h-80 bg-gray-800 relative overflow-hidden">
        <iframe
          src={websiteUrl}
          title={`Website ${String.fromCharCode(65 + index)}`}
          className="w-full h-full border-0"
        />
      </div>
    </motion.div>
  );
};