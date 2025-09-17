import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Terminal, Shield, AlertTriangle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const GameLoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [terminalText, setTerminalText] = useState('');

  const { signIn, signUp } = useAuth();

  const terminalMessages = [
    'INITIALIZING SECURE CONNECTION...',
    'ESTABLISHING ENCRYPTED TUNNEL...',
    'VERIFYING AGENT CREDENTIALS...',
    'ACCESS CONTROL ACTIVE',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTerminalText(terminalMessages[index]);
      index = (index + 1) % terminalMessages.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          setError(`ACCESS_DENIED: ${error.message}`);
        } else {
          setMessage('VERIFICATION_EMAIL_SENT: Check your secure channel');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(`AUTHENTICATION_FAILED: ${error.message}`);
        }
      }
    } catch (err) {
      setError('SYSTEM_ERROR: Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pitch-black flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * window.innerWidth }}
            animate={{ y: window.innerHeight + 100 }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute text-terminal-green font-mono text-xs"
          >
            {Math.random().toString(36).substring(2, 15)}
          </motion.div>
        ))}
      </div>

      {/* Scanning Line */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-0.5 bg-terminal-green opacity-30 animate-scan"></div>
      </div>

      <div className="max-w-md w-full z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Shield className="w-16 h-16 text-terminal-green" />
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-3xl font-bold text-terminal-green mb-2 tracking-wider"
          >
            <span className="text-terminal-blue">DUALITE</span>{' '}
            <span className="text-terminal-orange">SECURITY</span>{' '}
            <span className="text-terminal-green">PORTAL</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-mono text-terminal-blue text-sm mb-4"
          >
            <Terminal className="w-4 h-4 inline mr-2" />
            {terminalText}
            <span className="animate-blink">█</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center gap-2 text-terminal-red text-xs"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="font-mono">CLASSIFIED ACCESS - AUTHORIZED PERSONNEL ONLY</span>
          </motion.div>
        </motion.div>

        {/* Login Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-console-bg border-2 border-terminal-green rounded-lg p-6 relative overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-800">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-terminal-red rounded-full"></div>
              <div className="w-3 h-3 bg-terminal-orange rounded-full"></div>
              <div className="w-3 h-3 bg-terminal-green rounded-full"></div>
            </div>
            <span className="font-mono text-terminal-green text-sm">
              SECURE_LOGIN_v2.1.0
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block font-mono text-terminal-green text-sm mb-2">
                AGENT_EMAIL:
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-terminal-blue w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-terminal-blue rounded-lg text-terminal-green font-mono placeholder-gray-500 focus:border-terminal-green focus:outline-none"
                  placeholder="agent@dualite.dev"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-mono text-terminal-green text-sm mb-2">
                ACCESS_CODE:
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-terminal-blue w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-terminal-blue rounded-lg text-terminal-green font-mono placeholder-gray-500 focus:border-terminal-green focus:outline-none"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-blue hover:text-terminal-green transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-terminal-green text-black py-3 rounded-lg font-mono font-bold hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                  />
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  <Terminal className="w-5 h-5" />
                  {isSignUp ? 'REQUEST_ACCESS' : 'AUTHENTICATE'}
                </>
              )}
            </motion.button>
          </form>

          {/* Toggle */}
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setMessage('');
              }}
              className="font-mono text-terminal-blue hover:text-terminal-green text-sm transition-colors"
            >
              {isSignUp ? '> EXISTING_AGENT_LOGIN' : '> REQUEST_NEW_ACCESS'}
            </button>
          </div>

          {/* Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-4 p-3 bg-terminal-red bg-opacity-20 border border-terminal-red rounded-lg"
            >
              <p className="text-terminal-red text-sm font-mono">{error}</p>
            </motion.div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-4 p-3 bg-terminal-green bg-opacity-20 border border-terminal-green rounded-lg"
            >
              <p className="text-terminal-green text-sm font-mono">{message}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-600 text-xs font-mono">
            DUALITE_SECURITY_v2.1.0 | UNAUTHORIZED_ACCESS_PROHIBITED
          </p>
        </motion.div>
      </div>
    </div>
  );
};
