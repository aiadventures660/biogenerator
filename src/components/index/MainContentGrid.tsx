
import React from 'react';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';

interface MainContentGridProps {
  bioText: string;
  setBioText: (text: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  characterLimit: number;
  insertSymbol: (symbol: string) => void;
  insertTemplate: (template: string) => void;
  handleAIBioGenerated: (bio: string) => void;
  copyToClipboard: () => void;
}

export const MainContentGrid: React.FC<MainContentGridProps> = ({
  bioText,
  setBioText,
  selectedFont,
  setSelectedFont,
  characterLimit,
  insertSymbol,
  insertTemplate,
  handleAIBioGenerated,
  copyToClipboard
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      <LeftColumn 
        insertTemplate={insertTemplate}
        handleAIBioGenerated={handleAIBioGenerated}
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
        bioText={bioText}
        setBioText={setBioText}
      />
      
      <RightColumn 
        bioText={bioText}
        setBioText={setBioText}
        selectedFont={selectedFont}
        characterLimit={characterLimit}
        insertSymbol={insertSymbol}
        copyToClipboard={copyToClipboard}
      />
    </div>
  );
};
