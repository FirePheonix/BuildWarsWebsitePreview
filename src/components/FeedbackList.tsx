import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';

export const FeedbackList: React.FC = () => {
  const [input, setInput] = useState('');
  const [feedback] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Here you could add feedback to your system
      console.log('Feedback submitted:', input);
      setInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-console-bg border border-console-border rounded-lg p-6 h-full flex flex-col"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-terminal-orange rounded-full animate-pulse"></div>
        <h2 className="font-mono text-terminal-orange font-semibold tracking-wide">
          FEEDBACK LIST ({feedback.length})
        </h2>
      </div>

      <div className="flex-grow">
        {feedback.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="font-mono text-gray-500 text-sm">
              No feedback collected yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {feedback.map((item, index) => (
              <div key={index} className="p-3 bg-gray-900 border border-gray-800 rounded-lg">
                <p className="font-mono text-gray-300 text-sm">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Analysis Input */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-terminal-blue rounded-full"></div>
          <h3 className="font-mono text-terminal-blue font-semibold text-sm">
            ANALYSIS INPUT
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="I want to create a fintech app for gen x in canada"
            className="w-full h-20 bg-gray-900 border border-gray-700 rounded-lg p-3 text-terminal-green font-mono text-sm placeholder-gray-500 focus:border-terminal-green focus:outline-none resize-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-terminal-blue text-black rounded-lg font-mono text-sm font-bold hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            SUBMIT_ANALYSIS
          </button>
        </form>
      </div>
    </motion.div>
  );
};
