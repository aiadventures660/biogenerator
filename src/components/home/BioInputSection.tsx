import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit3 } from 'lucide-react';
interface BioInputSectionProps {
  bioText: string;
  setBioText: (text: string) => void;
  characterLimit?: number; // now optional
  platform?: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok';
}
export const BioInputSection: React.FC<BioInputSectionProps> = ({
  bioText,
  setBioText,
  characterLimit,
  platform = 'instagram',
}) => {
  // Platform-specific limits
  const platformLimits: Record<string, number> = {
    instagram: 150,
    twitter: 160,
    tiktok: 80,
    facebook: 101,
    linkedin: 101,
  };
  const limit = characterLimit ?? platformLimits[platform] ?? 150;
  const charactersLeft = limit - bioText.length;
  return <Card className="shadow-lg border-2 border-green-200 dark:border-green-600 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm relative overflow-hidden">
      {/* Pulsing highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-green-400/10 animate-pulse"></div>
      {/* Spotlight indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-xs font-medium text-green-600 dark:text-green-400 animate-pulse">
          Customize Here!
        </span>
      </div>
      <CardHeader className="pb-4 border-b border-green-100 dark:border-green-700 relative z-10">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
              <Edit3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
                Write Your Bio
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 animate-bounce">
                  Start Here!
                </span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
                Craft your perfect {platform.charAt(0).toUpperCase() + platform.slice(1)} bio • Customize any template
              </p>
            </div>
          </div>
          <Badge variant={charactersLeft < 0 ? "destructive" : charactersLeft < 20 ? "secondary" : "default"} className="text-sm px-3 py-1 rounded-none">
            {charactersLeft} chars left
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 relative z-10">
        <div className="relative">
          <Textarea value={bioText} onChange={e => setBioText(e.target.value)} placeholder="✨ Type your bio here, or use AI generation and templates above to get started! ✨\n\nUse line breaks and emojis to make it pop! \nTry: Your Name | Your Passion | Your Goal" className="min-h-32 resize-none border-green-200 dark:border-green-600 focus:border-green-500 dark:focus:border-green-400 text-base leading-relaxed bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm" maxLength={limit + 50} />
          {/* Floating helper text */}
          {!bioText && <div className="absolute top-2 right-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-lg animate-pulse">
              👆 Click to customize!
            </div>}
        </div>
      </CardContent>
    </Card>;
};