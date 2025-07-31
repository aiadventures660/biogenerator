import React, { useState } from 'react';
import { Sparkles, Copy, ArrowLeft, Search, Star, Heart, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";
import { useToast } from "@/hooks/use-toast";

const SymbolLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();

  const symbolCategories = {
    'Popular': [
      { symbol: '✨', name: 'Sparkles', keywords: ['sparkle', 'star', 'magic'] },
      { symbol: '💫', name: 'Dizzy Star', keywords: ['star', 'dizzy', 'sparkle'] },
      { symbol: '🌟', name: 'Glowing Star', keywords: ['star', 'glow', 'shine'] },
      { symbol: '⭐', name: 'Star', keywords: ['star', 'favorite'] },
      { symbol: '🔥', name: 'Fire', keywords: ['fire', 'hot', 'trending'] },
      { symbol: '💎', name: 'Diamond', keywords: ['diamond', 'gem', 'luxury'] },
      { symbol: '👑', name: 'Crown', keywords: ['crown', 'king', 'queen', 'royal'] },
      { symbol: '🚀', name: 'Rocket', keywords: ['rocket', 'launch', 'space'] }
    ],
    'Hearts': [
      { symbol: '❤️', name: 'Red Heart', keywords: ['heart', 'love', 'red'] },
      { symbol: '💜', name: 'Purple Heart', keywords: ['heart', 'purple', 'love'] },
      { symbol: '💙', name: 'Blue Heart', keywords: ['heart', 'blue', 'love'] },
      { symbol: '💚', name: 'Green Heart', keywords: ['heart', 'green', 'love'] },
      { symbol: '💛', name: 'Yellow Heart', keywords: ['heart', 'yellow', 'love'] },
      { symbol: '🧡', name: 'Orange Heart', keywords: ['heart', 'orange', 'love'] },
      { symbol: '🖤', name: 'Black Heart', keywords: ['heart', 'black', 'love'] },
      { symbol: '🤍', name: 'White Heart', keywords: ['heart', 'white', 'love'] },
      { symbol: '💕', name: 'Two Hearts', keywords: ['hearts', 'love', 'couple'] },
      { symbol: '💖', name: 'Sparkling Heart', keywords: ['heart', 'sparkle', 'love'] }
    ],
    'Arrows': [
      { symbol: '→', name: 'Right Arrow', keywords: ['arrow', 'right', 'next'] },
      { symbol: '←', name: 'Left Arrow', keywords: ['arrow', 'left', 'back'] },
      { symbol: '↑', name: 'Up Arrow', keywords: ['arrow', 'up', 'increase'] },
      { symbol: '↓', name: 'Down Arrow', keywords: ['arrow', 'down', 'decrease'] },
      { symbol: '⬆️', name: 'Up Arrow', keywords: ['arrow', 'up'] },
      { symbol: '⬇️', name: 'Down Arrow', keywords: ['arrow', 'down'] },
      { symbol: '➡️', name: 'Right Arrow', keywords: ['arrow', 'right'] },
      { symbol: '⬅️', name: 'Left Arrow', keywords: ['arrow', 'left'] },
      { symbol: '↗️', name: 'Up-Right Arrow', keywords: ['arrow', 'diagonal'] },
      { symbol: '↘️', name: 'Down-Right Arrow', keywords: ['arrow', 'diagonal'] }
    ],
    'Dots & Lines': [
      { symbol: '•', name: 'Bullet Point', keywords: ['bullet', 'dot', 'point'] },
      { symbol: '◦', name: 'White Bullet', keywords: ['bullet', 'dot', 'white'] },
      { symbol: '▪️', name: 'Black Small Square', keywords: ['square', 'black', 'dot'] },
      { symbol: '▫️', name: 'White Small Square', keywords: ['square', 'white', 'dot'] },
      { symbol: '|', name: 'Vertical Line', keywords: ['line', 'vertical', 'separator'] },
      { symbol: '‖', name: 'Double Vertical Line', keywords: ['line', 'double'] },
      { symbol: '―', name: 'Horizontal Line', keywords: ['line', 'horizontal'] },
      { symbol: '⋅', name: 'Middle Dot', keywords: ['dot', 'middle', 'center'] },
      { symbol: '∙', name: 'Bullet Operator', keywords: ['bullet', 'operator'] },
      { symbol: '⁃', name: 'Hyphen Bullet', keywords: ['bullet', 'hyphen'] }
    ],
    'Symbols': [
      { symbol: '©', name: 'Copyright', keywords: ['copyright', 'legal'] },
      { symbol: '®', name: 'Registered', keywords: ['registered', 'trademark'] },
      { symbol: '™', name: 'Trademark', keywords: ['trademark', 'legal'] },
      { symbol: '§', name: 'Section', keywords: ['section', 'legal'] },
      { symbol: '¶', name: 'Paragraph', keywords: ['paragraph', 'text'] },
      { symbol: '†', name: 'Dagger', keywords: ['dagger', 'cross'] },
      { symbol: '‡', name: 'Double Dagger', keywords: ['dagger', 'double'] },
      { symbol: '°', name: 'Degree', keywords: ['degree', 'temperature'] },
      { symbol: '∞', name: 'Infinity', keywords: ['infinity', 'forever'] },
      { symbol: '±', name: 'Plus Minus', keywords: ['plus', 'minus', 'math'] }
    ],
    'Math': [
      { symbol: '+', name: 'Plus', keywords: ['plus', 'add', 'positive'] },
      { symbol: '−', name: 'Minus', keywords: ['minus', 'subtract'] },
      { symbol: '×', name: 'Multiply', keywords: ['multiply', 'times'] },
      { symbol: '÷', name: 'Divide', keywords: ['divide', 'division'] },
      { symbol: '=', name: 'Equals', keywords: ['equals', 'equal'] },
      { symbol: '≠', name: 'Not Equal', keywords: ['not', 'equal'] },
      { symbol: '≈', name: 'Approximately', keywords: ['approximate', 'about'] },
      { symbol: '√', name: 'Square Root', keywords: ['root', 'square'] },
      { symbol: 'π', name: 'Pi', keywords: ['pi', 'math'] },
      { symbol: 'Σ', name: 'Sigma', keywords: ['sigma', 'sum'] }
    ],
    'Currency': [
      { symbol: '$', name: 'Dollar', keywords: ['dollar', 'money', 'usd'] },
      { symbol: '€', name: 'Euro', keywords: ['euro', 'money'] },
      { symbol: '£', name: 'Pound', keywords: ['pound', 'money', 'gbp'] },
      { symbol: '¥', name: 'Yen', keywords: ['yen', 'money', 'jpy'] },
      { symbol: '₹', name: 'Rupee', keywords: ['rupee', 'money', 'inr'] },
      { symbol: '₽', name: 'Ruble', keywords: ['ruble', 'money'] },
      { symbol: '₩', name: 'Won', keywords: ['won', 'money', 'krw'] },
      { symbol: '¢', name: 'Cent', keywords: ['cent', 'money'] },
      { symbol: '₨', name: 'Rupee', keywords: ['rupee', 'money'] },
      { symbol: '＄', name: 'Fullwidth Dollar', keywords: ['dollar', 'wide'] }
    ],
    'Decorative': [
      { symbol: '☆', name: 'White Star', keywords: ['star', 'white', 'outline'] },
      { symbol: '★', name: 'Black Star', keywords: ['star', 'black', 'filled'] },
      { symbol: '◊', name: 'Diamond', keywords: ['diamond', 'shape'] },
      { symbol: '◈', name: 'Diamond with Dot', keywords: ['diamond', 'dot'] },
      { symbol: '❖', name: 'Black Diamond', keywords: ['diamond', 'black'] },
      { symbol: '※', name: 'Reference Mark', keywords: ['reference', 'mark'] },
      { symbol: '⚡', name: 'Lightning', keywords: ['lightning', 'electric', 'power'] },
      { symbol: '☀️', name: 'Sun', keywords: ['sun', 'sunny', 'bright'] },
      { symbol: '☽', name: 'Moon', keywords: ['moon', 'night'] },
      { symbol: '☾', name: 'Crescent Moon', keywords: ['moon', 'crescent'] }
    ]
  };

  const categories = ['All', ...Object.keys(symbolCategories)];

  const getAllSymbols = () => {
    return Object.values(symbolCategories).flat();
  };

  const getFilteredSymbols = () => {
    let symbols = selectedCategory === 'All' 
      ? getAllSymbols() 
      : symbolCategories[selectedCategory as keyof typeof symbolCategories] || [];

    if (searchTerm) {
      symbols = symbols.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return symbols;
  };

  const copySymbol = async (symbol: string, name: string) => {
    try {
      await navigator.clipboard.writeText(symbol);
      toast({
        title: `${name} Copied! ✨`,
        description: `"${symbol}" copied to clipboard!`
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try copying manually.",
        variant: "destructive"
      });
    }
  };

  const filteredSymbols = getFilteredSymbols();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 dark:from-gray-900 dark:via-orange-900/10 dark:to-red-900/10">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 dark:text-orange-400 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Symbol Library
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover thousands of symbols and special characters. Perfect for social media bios, 
            usernames, and making your text stand out!
          </p>
        </div>

        {/* Search and Filter */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search symbols... (e.g., heart, star, arrow)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={selectedCategory === category ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Symbols Grid */}
        {filteredSymbols.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No symbols found matching your search.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-12">
            {filteredSymbols.map((item, index) => (
              <Card 
                key={index} 
                className="hover:shadow-md transition-all cursor-pointer border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                onClick={() => copySymbol(item.symbol, item.name)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{item.symbol}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 truncate" title={item.name}>
                    {item.name}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Popular Symbols</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Most used symbols for social media
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Heart Collection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Express love with colored hearts
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Special Characters</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Unique symbols and decorative text
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Tips */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-600" />
              How to Use Symbols
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">✨ Quick Copy</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Click any symbol to copy instantly</li>
                  <li>• Use search to find specific symbols</li>
                  <li>• Browse by category for organized selection</li>
                  <li>• Mix and match for creative combinations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Pro Tips</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Use bullets (•) to organize bio points</li>
                  <li>• Add arrows (→) to guide attention</li>
                  <li>• Hearts (❤️) show personality and warmth</li>
                  <li>• Stars (✨) add sparkle and emphasis</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default SymbolLibrary;
