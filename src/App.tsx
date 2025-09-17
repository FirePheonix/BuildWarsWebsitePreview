import { useState, useEffect } from 'react';
import { GameWebsiteCard } from './components/GameWebsiteCard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GameHeader } from './components/GameHeader';
import { WebsiteStatus } from './components/WebsiteStatus';
import { AgentActivity } from './components/AgentActivity';
import { FeedbackList } from './components/FeedbackList';
import { useProjects } from './hooks/useProjects';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

function AppContent() {
  const { currentGame, currentGameIndex, nextGame, prevGame, loading, error, totalGames } = useProjects();
  const [showTools, setShowTools] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Reset showTools when game changes and add navigation state
  useEffect(() => {
    setIsNavigating(true);
    setShowTools(false);
    
    const timeout = setTimeout(() => {
      setIsNavigating(false);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [currentGameIndex]);

  const handleNextGame = () => {
    setShowTools(false);
    setIsNavigating(true);
    nextGame();
  };

  const handlePrevGame = () => {
    setShowTools(false);
    setIsNavigating(true);
    prevGame();
  };

  return (
    <div className="min-h-screen bg-pitch-black text-pitch-white relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * window.innerWidth }}
            animate={{ y: window.innerHeight + 100 }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute text-terminal-green font-mono text-xs"
          >
            {Math.random().toString(36).substring(2, 12)}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <GameHeader />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-grow">
        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-terminal-red bg-opacity-20 border border-terminal-red rounded-lg p-4 mb-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-terminal-red rounded-full animate-pulse"></div>
              <span className="font-mono text-terminal-red font-bold text-sm">SYSTEM_ERROR:</span>
            </div>
            <p className="font-mono text-terminal-red text-sm mt-1">{error}</p>
          </motion.div>
        )}

        {/* Game Display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-terminal-green"></div>
            <p className="font-mono text-terminal-green mt-4">LOADING GAME DATA...</p>
          </div>
        ) : currentGame ? (
          <div>
            {/* Game Header with Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevGame}
                  disabled={totalGames <= 1}
                  className="flex items-center gap-2 px-4 py-2 bg-console-bg border border-console-border rounded-lg hover:border-terminal-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="font-mono text-sm">PREV GAME</span>
                </button>

                <div className="text-center">
                  <h1 className="font-mono text-terminal-green text-2xl font-bold mb-2">
                    {currentGame[""] || `GAME ${currentGameIndex + 1}`}
                  </h1>
                </div>

                <button
                  onClick={handleNextGame}
                  disabled={totalGames <= 1}
                  className="flex items-center gap-2 px-4 py-2 bg-console-bg border border-console-border rounded-lg hover:border-terminal-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-mono text-sm">NEXT GAME</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Reveal Tools Button */}
              <div className="text-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTools(!showTools)}
                  className="flex items-center gap-3 mx-auto px-6 py-3 bg-terminal-orange bg-opacity-20 border border-terminal-orange rounded-lg hover:bg-terminal-orange hover:bg-opacity-30 transition-all duration-200 font-mono text-terminal-orange font-medium"
                >
                  {showTools ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  {showTools ? 'HIDE TOOLS' : 'REVEAL TOOLS'}
                </motion.button>
              </div>
            </motion.div>

            {/* Websites Grid Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
                <h2 className="font-mono text-terminal-green font-bold text-lg tracking-wide">
                  BUILD WAR SUBMISSIONS
                </h2>
                <div className="flex-1 h-px bg-terminal-green opacity-30"></div>
                <span className="font-mono text-terminal-green text-sm">
                  4/4 DEPLOYED
                </span>
              </div>
            </motion.div>

            {/* 2x2 Website Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GameWebsiteCard
                websiteUrl={currentGame.linkAWebsite}
                toolName={currentGame.linkATool}
                index={0}
                showTool={showTools && !isNavigating}
              />
              <GameWebsiteCard
                websiteUrl={currentGame.linkBWebsite}
                toolName={currentGame.linkBTool}
                index={1}
                showTool={showTools && !isNavigating}
              />
              <GameWebsiteCard
                websiteUrl={currentGame.linkCWebsite}
                toolName={currentGame.linkCTool}
                index={2}
                showTool={showTools && !isNavigating}
              />
              <GameWebsiteCard
                websiteUrl={currentGame.linkDWebsite}
                toolName={currentGame.linkDTool}
                index={3}
                showTool={showTools && !isNavigating}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-mono text-gray-500">No games available</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-console-border bg-console-bg py-8 px-6 mt-12">
        <div className="container mx-auto">
          {/* New detailed footer content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <WebsiteStatus projectCount={4} loading={loading} />
            <AgentActivity projects={[]} />
            <FeedbackList />
          </div>

          {/* Original footer content */}
          <div className="border-t border-console-border pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
                <span className="font-mono text-terminal-green text-sm">
                  DUALITE_ALPHA_v2.1.0
                </span>
              </div>
              <div className="font-mono text-gray-500 text-xs">
                SYSTEM_STATUS: OPERATIONAL | UPTIME: 99.9%
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ProtectedRoute>
      <AppContent />
    </ProtectedRoute>
  );
}

export default App;
