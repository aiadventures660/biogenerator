
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/contexts/DarkModeContext";

export const HomeHeader: React.FC = () => {
  const { darkMode } = useDarkMode();
  return (
    <div className="text-center mb-6 lg:mb-12 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 lg:mb-6">
        <div className="p-1.5 lg:p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
          <Sparkles className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
        </div>
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-in slide-in-from-top duration-1000">
          Instagram Bio Generator
        </h1>
        <div className="hidden sm:block p-1.5 lg:p-2 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
          <Sparkles className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
        </div>
      </div>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Create stunning Instagram bios with AI generation, fancy fonts, symbols, and perfect formatting. 
        Stand out with a bio that's uniquely you!
        </p>
      
      {/* Dark Mode Toggle Removed */}
    </div>
  );
};
