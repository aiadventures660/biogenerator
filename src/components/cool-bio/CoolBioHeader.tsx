
import React from 'react';
import { ArrowLeft, Lightbulb, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface CoolBioHeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const CoolBioHeader: React.FC<CoolBioHeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <div className="mb-6 lg:mb-8 px-4">
      <Link to="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-4 lg:mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Generator
      </Link>
      
      <div className="text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 lg:gap-3 mb-4 lg:mb-6">
          <div className="p-1.5 lg:p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
            <Lightbulb className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent text-center">
            Cool Instagram Bio Ideas
          </h1>
        </div>
        <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
          Discover the coolest Instagram bio ideas that will make your profile stand out from the crowd. 
          Get inspired with creative, unique, and trendy bio concepts for every personality and style.
        </p>
      </div>

      <Button 
        onClick={onToggleDarkMode} 
        variant="outline" 
        size="sm" 
        className="mt-4 lg:mt-6 mx-auto block"
      >
        {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
        {darkMode ? 'Light' : 'Dark'} Mode
      </Button>
    </div>
  );
};
