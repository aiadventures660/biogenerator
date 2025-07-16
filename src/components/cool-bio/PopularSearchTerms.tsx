
import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PopularSearchTerms: React.FC = () => {
  const bioStyles = [
    "Cool & trendy bios",
    "Unique personal styles",
    "Creative expressions",
    "Short & memorable",
    "Business professional",
    "Aesthetic & artistic",
    "Fun & engaging",
    "Photography focused",
    "Student lifestyle",
    "Influencer ready"
  ];

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50 mb-12">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
            <Star className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Popular Bio Styles
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
              Different styles to inspire your Instagram bio
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-3">
          {bioStyles.map((keyword, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Sparkles className="h-4 w-4 text-purple-500 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{keyword}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
