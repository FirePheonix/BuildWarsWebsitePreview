import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="border-b border-gray-800 bg-pitch-black">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Title */}
          <div className="text-center flex-1">
            <h1 className="font-elegant text-4xl md:text-5xl font-bold tracking-tight text-pitch-white">
              Dualite Build Wars
            </h1>
            <p className="font-sans text-gray-300 text-lg mt-2">
              Discover extraordinary web projects and games crafted with passion and innovation
            </p>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-4 h-4" />
              <span className="font-sans text-sm hidden md:inline">
                {user?.email}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-400 hover:text-pitch-white transition-colors font-sans text-sm"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
