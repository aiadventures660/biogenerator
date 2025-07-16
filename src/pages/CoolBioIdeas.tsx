
import React, { useState } from 'react';
import { GenerateNewBios } from "@/components/GenerateNewBios";
import { CoolBioHeader } from "@/components/cool-bio/CoolBioHeader";
import { BioCategoriesGrid } from "@/components/cool-bio/BioCategoriesGrid";
import { PopularSearchTerms } from "@/components/cool-bio/PopularSearchTerms";
import { CoolBioGuide } from "@/components/cool-bio/CoolBioGuide";
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";

const CoolBioIdeas = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30'}`}>
      <Header />
      <div className="container mx-auto px-3 lg:px-4 py-6 lg:py-8 max-w-6xl">
        <CoolBioHeader darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

        <div className="px-4">
          <GenerateNewBios 
            bioType="cool"
            gradientColors="from-white via-orange-50/30 to-red-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50"
            accentColor="from-orange-500 to-red-500"
          />
        </div>

        <BioCategoriesGrid />

        <div className="px-4">
          <PopularSearchTerms />

          <CoolBioGuide />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoolBioIdeas;
