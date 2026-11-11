import React, { createContext, useContext, useEffect, useState } from 'react';

interface PreferencesContextType {
  favorites: string[];
  recentTools: string[];
  toggleFavorite: (toolId: string) => void;
  recordToolUsage: (toolId: string) => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('tn_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentTools, setRecentTools] = useState<string[]>(() => {
    const saved = localStorage.getItem('tn_recent');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tn_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('tn_recent', JSON.stringify(recentTools));
  }, [recentTools]);

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const recordToolUsage = (toolId: string) => {
    setRecentTools((prev) => {
      const filtered = prev.filter((id) => id !== toolId);
      return [toolId, ...filtered].slice(0, 8);
    });
  };

  return (
    <PreferencesContext.Provider value={{ favorites, recentTools, toggleFavorite, recordToolUsage }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider');
  return ctx;
};