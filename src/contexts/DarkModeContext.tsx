
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [darkMode, setDarkModeState] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize dark mode from localStorage after component mounts
  useEffect(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        const isDark = JSON.parse(saved);
        setDarkModeState(isDark);
        // Apply the class immediately to prevent flash
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch (error) {
      console.warn('Failed to load dark mode from localStorage:', error);
    }
    setIsInitialized(true);
  }, []);

  const setDarkMode = (value: boolean) => {
    setDarkModeState(value);
    try {
      localStorage.setItem('darkMode', JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save dark mode to localStorage:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class whenever darkMode changes
  useEffect(() => {
    if (!isInitialized) return;
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, isInitialized]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
