
import React, { useState } from 'react';
import { Type, Hash, Palette, Lightbulb, Wand2, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { TubelightNavbar } from "@/components/TubelightNavbar";
import { Header } from "@/components/Header";

import Footer from "@/components/ui/footer";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { HomeHeader } from "@/components/home/HomeHeader";
import { QuickLinksSection } from "@/components/home/QuickLinksSection";
import { MainContentGrid } from "@/components/index/MainContentGrid";
import { useIndexNavigation } from "@/hooks/useIndexNavigation";

export const IndexPage = () => {
  const [bioText, setBioText] = useState('');
  const [selectedFont, setSelectedFont] = useState('normal');
  const [activeSection, setActiveSection] = useState('ai');
  const { darkMode } = useDarkMode();
  const { toast } = useToast();
  const characterLimit = 150;

  const { navItems, handleNavClick } = useIndexNavigation(setActiveSection);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(bioText);
      toast({
        title: "Bio Copied! ✨",
        description: "Your aesthetic bio is ready to paste on Instagram!"
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the text manually.",
        variant: "destructive"
      });
    }
  };

  const insertSymbol = (symbol: string) => {
    setBioText(prev => prev + symbol);
  };

  const insertTemplate = (template: string) => {
    setBioText(template);
  };

  const handleAIBioGenerated = (generatedBio: string) => {
    setBioText(generatedBio);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30'}`}>
      <Header />
      
      <div className="container mx-auto px-3 lg:px-4 py-4 lg:py-8 max-w-7xl">
        <HomeHeader />
        <QuickLinksSection />
        
        <TubelightNavbar 
          items={navItems} 
          activeItem={activeSection} 
          onItemClick={handleNavClick} 
        />

        <MainContentGrid 
          bioText={bioText}
          setBioText={setBioText}
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          characterLimit={characterLimit}
          insertSymbol={insertSymbol}
          insertTemplate={insertTemplate}
          handleAIBioGenerated={handleAIBioGenerated}
          copyToClipboard={copyToClipboard}
        />
      </div>
      
      
      <Footer />
    </div>
  );
};
