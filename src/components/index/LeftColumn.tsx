
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { AIBioGenerator } from "@/components/AIBioGenerator";
import { TemplateSelector } from "@/components/TemplateSelector";
import { FontSelector } from "@/components/FontSelector";

interface LeftColumnProps {
  insertTemplate: (template: string) => void;
  handleAIBioGenerated: (bio: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  bioText: string;
  setBioText: (text: string) => void;
}

export const LeftColumn: React.FC<LeftColumnProps> = ({
  insertTemplate,
  handleAIBioGenerated,
  selectedFont,
  setSelectedFont,
  bioText,
  setBioText
}) => {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* AI Bio Generator */}
      <div id="ai">
        <AIBioGenerator onBioGenerated={handleAIBioGenerated} />
      </div>
      
      {/* Template Selector */}
      <div id="templates">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-indigo-50/20 to-blue-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm">
          <CardHeader className="pb-3 lg:pb-4 border-b border-gray-100 dark:border-gray-700">
            <CardTitle className="flex items-center gap-2 lg:gap-3">
              <div className="p-1.5 lg:p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500">
                <Star className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Bio Templates
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-normal">
                  Quick start with pre-made templates
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 lg:pt-6">
            <TemplateSelector onSelectTemplate={insertTemplate} />
          </CardContent>
        </Card>
      </div>

      {/* Font Selector */}
      <div id="fonts">
        <FontSelector 
          selectedFont={selectedFont} 
          onFontChange={setSelectedFont} 
          bioText={bioText} 
          setBioText={setBioText} 
        />
      </div>
    </div>
  );
};
