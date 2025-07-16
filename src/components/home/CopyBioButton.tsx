
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';

interface CopyBioButtonProps {
  bioText: string;
  onCopy: () => void;
}

export const CopyBioButton: React.FC<CopyBioButtonProps> = ({ bioText, onCopy }) => {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-orange-50/20 to-red-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm">
      <CardContent className="pt-6 py-[13px]">
        <Button 
          onClick={onCopy} 
          className="w-full h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-200" 
          disabled={!bioText.trim()}
        >
          <Copy className="h-5 w-5 mr-3" />
          Copy Bio to Clipboard
        </Button>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-3">
          Copy and paste directly into your Instagram bio!
        </p>
      </CardContent>
    </Card>
  );
};
