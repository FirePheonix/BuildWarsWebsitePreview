import { useState, useEffect } from 'react';
import { GameData } from '../types';

export const useProjects = () => {
  const [games, setGames] = useState<GameData[]>([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        const url = 'https://api.sheety.co/d4bd5bfc74b79f01d2aa0ff23c52bdca/dualiteEvent/sheet1';
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // The API returns an array directly based on your example
        let gameData: GameData[] = [];
        
        if (Array.isArray(data)) {
          gameData = data;
        } else if (data.sheet1 && Array.isArray(data.sheet1)) {
          gameData = data.sheet1;
        } else {
          const firstArrayProp = Object.values(data).find(val => Array.isArray(val));
          gameData = firstArrayProp as GameData[] || [];
        }
        
        setGames(gameData);
        setError(null);
      } catch (err) {
        setError(`Failed to load games: ${err instanceof Error ? err.message : 'Unknown error'}`);
        
        // Fallback data for demonstration
        setGames([
          {
            "": "Game1: build me a minimalist note taking journal",
            linkATool: "Dualite",
            linkAWebsite: "https://spectacular-otter-545c51.netlify.app",
            linkBTool: "Lovable",
            linkBWebsite: "https://simple-thoughts-log.lovable.app",
            linkCTool: "Bolt",
            linkCWebsite: "https://journal-alpha-iota.vercel.app/",
            linkDTool: "v0",
            linkDWebsite: "https://journall-v0.vercel.app",
            id: 2
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const nextGame = () => {
    setCurrentGameIndex((prev) => (prev + 1) % games.length);
  };

  const prevGame = () => {
    setCurrentGameIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const currentGame = games[currentGameIndex];

  return { 
    games, 
    currentGame, 
    currentGameIndex, 
    nextGame, 
    prevGame, 
    loading, 
    error,
    totalGames: games.length
  };
};
