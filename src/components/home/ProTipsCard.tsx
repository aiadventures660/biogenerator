
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from 'lucide-react';

export const ProTipsCard: React.FC = () => {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-yellow-50/20 to-amber-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm">
      <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-700">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Pro Tips
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
              Make your bio stand out
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2 flex-shrink-0"></div>
          <p>Use AI generation for personalized bio ideas</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2 flex-shrink-0"></div>
          <p>Click "New Templates" to refresh bio template options</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2 flex-shrink-0"></div>
          <p>Use symbols to create visual breaks between sections</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2 flex-shrink-0"></div>
          <p>Keep it concise but memorable - first impressions matter!</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2 flex-shrink-0"></div>
          <p>Include a call-to-action or link to your content</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2 flex-shrink-0"></div>
          <p>Test how your bio looks on mobile devices</p>
        </div>
      </CardContent>
    </Card>
  );
};
