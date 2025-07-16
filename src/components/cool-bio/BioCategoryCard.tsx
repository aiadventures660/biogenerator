
import React from 'react';
import { Copy, LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface BioCategoryCardProps {
  title: string;
  ideas: string[];
  icon: LucideIcon;
  color: string;
}

export const BioCategoryCard: React.FC<BioCategoryCardProps> = ({ title, ideas, icon: Icon, color }) => {
  const { toast } = useToast();

  const copyToClipboard = async (bioText: string) => {
    try {
      await navigator.clipboard.writeText(bioText);
      toast({
        title: "Bio Copied! ✨",
        description: "Bio copied to clipboard - ready to paste on Instagram!"
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the text manually.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white via-gray-50/30 to-gray-100/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
              {ideas.length} cool bio ideas
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {ideas.map((idea, ideaIndex) => (
          <div key={ideaIndex} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Badge variant="outline" className="text-xs">
              {ideaIndex + 1}
            </Badge>
            <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
              {idea}
            </p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(idea)}
              className="h-8 w-8 p-0 hover:bg-orange-100 dark:hover:bg-orange-900/20"
              title="Copy bio to clipboard"
            >
              <Copy className="h-3 w-3 text-orange-600" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
