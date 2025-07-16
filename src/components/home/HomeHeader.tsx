
import React from 'react';
import { Sparkles, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface HomeHeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <div className="text-center mb-6 lg:mb-12 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 lg:mb-6">
        <div className="p-1.5 lg:p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
          <Sparkles className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent text-center">
          Instagram Bio Generator
        </h1>
        <div className="hidden sm:block p-1.5 lg:p-2 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
          <Sparkles className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
        </div>
      </div>
      <p className="text-base lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
        Create stunning Instagram bios with AI generation, fancy fonts, symbols, and perfect formatting. 
        Stand out with a bio that's uniquely you! ✨
      </p>
      
      {/* Dark Mode Toggle Removed */}
    </div>
  );
};
