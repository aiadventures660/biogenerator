
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Info, Shield, FileText, Instagram, Menu, X, Moon, Sun, Lightbulb } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/contexts/DarkModeContext";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const navItems = [{
    path: '/',
    label: 'Home',
    icon: Home
  }, {
    path: '/contact-us',
    label: 'Contact',
    icon: Mail
  }, {
    path: '/about-us',
    label: 'About',
    icon: Info
  }, {
    path: '/privacy-policy',
    label: 'Privacy Policy',
    icon: Shield
  }, {
    path: '/disclaimer',
    label: 'Disclaimer',
    icon: FileText
  }, {
    path: '/suggest-feature',
    label: 'Suggest',
    icon: Lightbulb
  }];

  const handleMobileNavClick = () => {
    setIsOpen(false);
  };
  
  return <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
              <Instagram className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Bio Generator
            </span>
          </Link>

          {/* Desktop Navigation + Dark Mode Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              {navItems.map(item => {
                const IconComponent = item.icon;
                return <Link key={item.path} to={item.path} className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 text-sm font-medium">
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>;
              })}
            </nav>
            <Button 
              onClick={toggleDarkMode} 
              variant="outline" 
              size="sm" 
              className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
              {darkMode ? 'Light' : 'Dark'} Mode
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <Instagram className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                      Bio Generator
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map(item => {
                    const IconComponent = item.icon;
                    return (
                      <Link 
                        key={item.path} 
                        to={item.path} 
                        onClick={handleMobileNavClick}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 text-base font-medium"
                      >
                        <IconComponent className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
                <Button 
                  onClick={toggleDarkMode} 
                  variant="outline" 
                  size="sm" 
                  className="mt-6 w-full border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                  {darkMode ? 'Light' : 'Dark'} Mode
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>;
};
