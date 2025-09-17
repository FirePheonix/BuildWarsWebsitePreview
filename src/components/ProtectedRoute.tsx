import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, AlertTriangle, Database, Shield, Terminal } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { GameLoginForm } from './GameLoginForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, isAuthorized, signOut } = useAuth();

  // Loading Screen with Game Aesthetics
  if (loading) {
    return (
      <div className="min-h-screen bg-pitch-black flex items-center justify-center relative overflow-hidden">
        {/* Background Matrix Effect */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * window.innerWidth }}
              animate={{ y: window.innerHeight + 100 }}
              transition={{
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              className="absolute text-terminal-green font-mono text-xs"
            >
              {Math.random().toString(36).substring(2, 10)}
            </motion.div>
          ))}
        </div>

        <div className="text-center z-10">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1, repeat: Infinity }
            }}
            className="w-16 h-16 border-4 border-terminal-green border-t-transparent rounded-full mx-auto mb-6"
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-mono text-terminal-green text-lg font-bold mb-2">
              {user ? 'AUTHORIZATION_CHECK' : 'AUTHENTICATION_VERIFY'}
            </h2>
            
            <div className="font-mono text-terminal-blue text-sm mb-4">
              <Terminal className="w-4 h-4 inline mr-2" />
              {user ? 'Scanning agent clearance level...' : 'Establishing secure connection...'}
              <span className="animate-blink">█</span>
            </div>
            
            {user && (
              <div className="bg-console-bg border border-terminal-blue rounded-lg p-4 max-w-sm">
                <p className="font-mono text-terminal-green text-xs">
                  AGENT_ID: {user.email?.split('@')[0]?.toUpperCase()}
                </p>
                <p className="font-mono text-gray-400 text-xs mt-1">
                  DOMAIN: {user.email?.split('@')[1]?.toUpperCase()}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // Login form if not authenticated
  if (!user) {
    return <GameLoginForm />;
  }

  // Access Denied Screen with Game Aesthetics
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-pitch-black flex items-center justify-center px-6 relative overflow-hidden">
        {/* Red Alert Background */}
        <div className="absolute inset-0 bg-terminal-red opacity-5 animate-pulse"></div>
        
        {/* Scanning Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-0.5 bg-terminal-red opacity-50 animate-scan"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg z-10"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity 
            }}
            className="mb-6"
          >
            <AlertTriangle className="w-20 h-20 text-terminal-red mx-auto" />
          </motion.div>
          
          <h1 className="font-mono text-3xl font-bold text-terminal-red mb-4 tracking-wider">
            ACCESS DENIED
          </h1>
          
          <div className="bg-console-bg border-2 border-terminal-red rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-terminal-red" />
              <span className="font-mono text-terminal-red font-bold">SECURITY VIOLATION</span>
            </div>
            
            <div className="text-left space-y-2 font-mono text-sm">
              <p className="text-gray-300">
                <span className="text-terminal-blue">AGENT_EMAIL:</span> {user.email}
              </p>
              <p className="text-gray-300">
                <span className="text-terminal-blue">CLEARANCE:</span> <span className="text-terminal-red">UNAUTHORIZED</span>
              </p>
              <p className="text-gray-300">
                <span className="text-terminal-blue">STATUS:</span> <span className="text-terminal-red">ACCESS_BLOCKED</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-terminal-blue" />
              <span className="font-mono text-terminal-blue font-medium text-sm">DATABASE STATUS</span>
            </div>
            <p className="font-mono text-gray-400 text-xs text-left">
              Authorization managed via SUPABASE.AUTHORIZED_USERS table.<br/>
              Contact DUALITE_ADMIN for clearance upgrade.
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signOut()}
            className="bg-terminal-red hover:bg-red-600 text-black px-8 py-3 rounded-lg font-mono font-bold transition-colors flex items-center gap-2 mx-auto"
          >
            <LogOut className="w-5 h-5" />
            TERMINATE_SESSION
          </motion.button>
          
          <p className="font-mono text-gray-600 text-xs mt-4">
            SECURITY_LEVEL: MAXIMUM | INTRUSION_DETECTED
          </p>
        </motion.div>
      </div>
    );
  }

  // Authorized - show main app
  return <>{children}</>;
};
