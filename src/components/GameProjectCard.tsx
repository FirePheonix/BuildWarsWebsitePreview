import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Terminal, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface GameProjectCardProps {
  project: Project;
  index: number;
}

export const GameProjectCard: React.FC<GameProjectCardProps> = ({ project, index }) => {
  const [showTools, setShowTools] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isGame = project.category?.toLowerCase() === 'game';

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
            WEBSITE #{index + 1}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {project.category && (
            <span className={`px-2 py-1 rounded-full text-xs font-mono font-bold ${
              isGame 
                ? 'bg-terminal-red bg-opacity-20 text-terminal-red border border-terminal-red' 
                : 'bg-terminal-blue bg-opacity-20 text-terminal-blue border border-terminal-blue'
            }`}>
              {project.category.toUpperCase()}
            </span>
          )}
          <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="h-48 bg-gray-800 relative overflow-hidden">
        {project.image && !imageError ? (
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          </a>
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <iframe
              src={project.url}
              title={project.name}
              className="w-full h-full border-0 pointer-events-none scale-50 origin-top-left"
              style={{ width: '200%', height: '200%' }}
              onError={() => setImageError(true)}
            />
          </div>
        )}
        
        {/* Scanning Overlay */}
        <div className="absolute inset-0 bg-terminal-green bg-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-terminal-green to-transparent opacity-20 animate-scan"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-mono text-terminal-green text-lg font-bold leading-tight flex-1 pr-4">
              {project.name?.toUpperCase()}
            </h3>
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-terminal-blue hover:text-terminal-green transition-colors"
              title={`Open ${project.name} in a new tab`}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          
          {project.description && (
            <p className="text-gray-300 text-sm leading-relaxed font-mono">
              <span className="text-terminal-blue">//</span> {project.description}
            </p>
          )}
        </div>

        {/* Tools Section for Games */}
        {isGame && project.tools && (
          <div className="border-t border-gray-800 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowTools(!showTools)}
              className="flex items-center gap-2 text-terminal-orange hover:text-orange-400 transition-colors duration-200 font-mono text-sm font-medium"
            >
              {showTools ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showTools ? 'HIDE ARSENAL' : 'REVEAL ARSENAL'}
            </motion.button>
            
            <motion.div
              initial={false}
              animate={{ height: showTools ? 'auto' : 0, opacity: showTools ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-3 bg-gray-900 border border-terminal-orange rounded-lg">
                <p className="text-terminal-orange text-sm font-mono">
                  <span className="font-bold">TECH_STACK:</span> {project.tools}
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Non-game tools */}
        {!isGame && project.tools && (
          <div className="border-t border-gray-800 pt-4">
            <p className="text-gray-300 text-sm font-mono">
              <span className="font-bold text-terminal-blue">TECH_STACK:</span> {project.tools}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
