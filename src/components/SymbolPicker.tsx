
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Star, Crown, Music } from 'lucide-react';

interface SymbolPickerProps {
  onSymbolSelect: (symbol: string) => void;
}

const symbolCategories = {
  hearts: {
    icon: Heart,
    symbols: ['♡', '♥', '💕', '💖', '💗', '💝', '💘', '💞', '💟', '❤️', '🤍', '🖤', '💜', '💛', '💚', '💙']
  },
  stars: {
    icon: Star,
    symbols: ['✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '⭐', '🌟', '💫', '⭐️', '🌠', '✨']
  },
  aesthetic: {
    icon: Sparkles,
    symbols: ['◦', '•', '◌', '○', '●', '◊', '◈', '◆', '❖', '⌬', '⌾', '⚬', '⚪', '⚫', '⬢', '⬡']
  },
  dividers: {
    icon: Crown,
    symbols: ['─', '━', '┄', '┅', '┈', '┉', '╌', '╍', '═', '﹌', '﹍', '﹎', '﹏', '▔', '▬', '―']
  },
  music: {
    icon: Music,
    symbols: ['♪', '♫', '♬', '♭', '♮', '♯', '🎵', '🎶', '🎼', '🎤', '🎧', '🎸', '🎹', '🥁', '🎺', '🎻']
  }
};

const popularEmojis = [
  '✨', '🌙', '☀️', '🌸', '🌺', '🦋', '🌈', '☁️', '💫', '🔮', 
  '👑', '💎', '🌹', '🍃', '🌿', '🌷', '🌻', '🌊', '🍯', '🧚‍♀️'
];

export const SymbolPicker: React.FC<SymbolPickerProps> = ({ onSymbolSelect }) => {
  const [activeCategory, setActiveCategory] = useState('hearts');

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-pink-50/20 to-rose-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm">
      <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-700">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Symbols & Emojis
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
              Add decorative symbols to your bio
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(symbolCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={key}
                variant={activeCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(key)}
                className={`transition-all duration-200 ${
                  activeCategory === key 
                    ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md" 
                    : "hover:bg-pink-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
                }`}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Button>
            );
          })}
        </div>

        {/* Symbol Grid */}
        <div className="grid grid-cols-8 gap-2">
          {symbolCategories[activeCategory as keyof typeof symbolCategories].symbols.map((symbol, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onSymbolSelect(symbol)}
              className="aspect-square p-0 text-lg hover:bg-pink-50 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-200 border-gray-200 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-500"
            >
              {symbol}
            </Button>
          ))}
        </div>

        {/* Popular Emojis Section */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Badge variant="secondary" className="mb-4 bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">Popular Emojis</Badge>
          <div className="grid grid-cols-10 gap-2">
            {popularEmojis.map((emoji, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onSymbolSelect(emoji)}
                className="aspect-square p-0 text-lg hover:bg-pink-50 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-200 border-gray-200 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-500"
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
