
import React from 'react';
import { Flame, Sparkles, Star, Zap } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export const CoolBioGuide: React.FC = () => {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-orange-50/20 to-red-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          The Ultimate Guide to Cool Instagram Bio Ideas
        </h2>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <p>
            Your Instagram bio is your digital first impression. With over 2 billion monthly active users, 
            standing out requires creativity, authenticity, and strategic thinking. Cool Instagram bio ideas 
            help you express your personality while attracting the right audience to your profile.
          </p>

          <h3 className="text-2xl font-semibold text-orange-600 dark:text-orange-400 mt-8 mb-4">
            What Makes an Instagram Bio "Cool"?
          </h3>
          
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Flame className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
              <span><strong>Authenticity:</strong> Cool bios reflect genuine personality and interests</span>
            </li>
            <li className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
              <span><strong>Creativity:</strong> Unique formatting, clever wordplay, and original content</span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
              <span><strong>Memorability:</strong> Something that sticks in people's minds</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
              <span><strong>Relevance:</strong> Current trends, relatable content, and timely references</span>
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-orange-600 dark:text-orange-400 mt-8 mb-4">
            Cool Bio Ideas by Personality Type
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">The Adventurer</h4>
              <p className="text-sm">Travel-focused, outdoorsy, always seeking new experiences</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">The Creative</h4>
              <p className="text-sm">Artistic, expressive, showcasing talents and passion projects</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">The Minimalist</h4>
              <p className="text-sm">Clean, simple, focusing on essential information only</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">The Motivator</h4>
              <p className="text-sm">Inspiring, goal-oriented, sharing positivity and success</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6 mt-8">
            <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-3">🔥 Trending Bio Elements for 2024</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Emojis:</strong> 🌟 ✨ 🔥 💫 🦋
              </div>
              <div>
                <strong>Symbols:</strong> ◦ ▪ ▫ ◊ ◈
              </div>
              <div>
                <strong>Styles:</strong> Minimalist, Aesthetic, Bold
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
