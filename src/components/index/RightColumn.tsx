
import React from 'react';
import { BioPreview } from "@/components/BioPreview";
import { SymbolPicker } from "@/components/SymbolPicker";
import { CopyBioButton } from "@/components/home/CopyBioButton";
import { BioInputSection } from "@/components/home/BioInputSection";
import { ProTipsCard } from "@/components/home/ProTipsCard";
import { Instagram, Facebook, Twitter, Linkedin, Music2 } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RightColumnProps {
  bioText: string;
  setBioText: (text: string) => void;
  selectedFont: string;
  characterLimit: number;
  insertSymbol: (symbol: string) => void;
  copyToClipboard: () => void;
}

export const RightColumn: React.FC<RightColumnProps> = ({
  bioText,
  setBioText,
  selectedFont,
  characterLimit,
  insertSymbol,
  copyToClipboard
}) => {
  // Get the platform from BioPreview (default: instagram)
  const [platform, setPlatform] = React.useState<'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok'>('instagram');
  // Suggestion feature state
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Bio Preview */}
      <div id="preview">
        <BioPreview bioText={bioText} selectedFont={selectedFont} platform={platform} onPlatformChange={(p) => setPlatform(p as typeof platform)} />
      </div>
      {/* Copy Button */}
      <CopyBioButton bioText={bioText} onCopy={copyToClipboard} />
      {/* Text Input */}
      <BioInputSection 
        bioText={bioText} 
        setBioText={setBioText} 
        platform={platform}
      />
      {/* Symbol Picker */}
      <div id="symbols">
        <SymbolPicker onSymbolSelect={insertSymbol} />
      </div>
      {/* Tips Card */}
      <ProTipsCard />
    </div>
  );
};
