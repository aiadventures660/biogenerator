
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, RefreshCw, Loader2, Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface GenerateNewBiosProps {
  bioType: 'aesthetic' | 'funny' | 'business' | 'cool';
  gradientColors: string;
  accentColor: string;
}

export const GenerateNewBios: React.FC<GenerateNewBiosProps> = ({ 
  bioType, 
  gradientColors, 
  accentColor 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBios, setGeneratedBios] = useState<string[]>([]);
  const { toast } = useToast();

  const getBioTypePrompt = (type: string) => {
    switch (type) {
      case 'aesthetic':
        return {
          tone: 'Aesthetic',
          style: 'With Emojis',
          personality: 'dreamy, artistic, minimalist vibes with soft colors and beautiful imagery'
        };
      case 'funny':
        return {
          tone: 'Funny',
          style: 'With Emojis',
          personality: 'humorous, witty, self-deprecating, and entertaining'
        };
      case 'business':
        return {
          tone: 'Professional',
          style: 'Clean Text',
          personality: 'professional, authoritative, trustworthy, and results-oriented'
        };
      case 'cool':
        return {
          tone: 'Bold',
          style: 'With Emojis',
          personality: 'trendy, confident, inspiring, and unique'
        };
      default:
        return {
          tone: 'Casual',
          style: 'With Emojis',
          personality: 'authentic and engaging'
        };
    }
  };

  const generateNewBios = async () => {
    setIsGenerating(true);
    
    try {
      const bioConfig = getBioTypePrompt(bioType);
      
      const { data, error } = await supabase.functions.invoke('generate-bio', {
        body: {
          interests: `${bioType} lifestyle, social media, personal branding`,
          profession: 'Content creator, influencer, social media enthusiast',
          personality: bioConfig.personality,
          tone: bioConfig.tone,
          style: bioConfig.style,
          bioType: bioType
        }
      });

      if (error) {
        console.error('Function invocation error:', error);
        throw new Error(error.message || 'Failed to generate bios');
      }

      if (data?.bios && Array.isArray(data.bios)) {
        setGeneratedBios(data.bios);
        toast({
          title: "New Bios Generated! ✨",
          description: `Created ${data.bios.length} fresh ${bioType} bio variations for you.`,
        });
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error generating bios:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate bios. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyBio = (bio: string) => {
    navigator.clipboard.writeText(bio);
    toast({
      title: "Bio Copied! ✨",
      description: "Your new bio is ready to paste on Instagram!"
    });
  };

  return (
    <Card className={`shadow-lg border-0 bg-gradient-to-br ${gradientColors} mb-8`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${accentColor}`}>
            <Wand2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Generate New {bioType.charAt(0).toUpperCase() + bioType.slice(1)} Bios
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
              Get fresh AI-generated {bioType} bios instantly
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Button 
          onClick={generateNewBios}
          disabled={isGenerating}
          className={`w-full h-12 bg-gradient-to-r ${accentColor} text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Generating {bioType} bios...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Generate New Bios
            </>
          )}
        </Button>

        {generatedBios.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 dark:text-gray-100">Fresh Bios</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  {generatedBios.length} new
                </Badge>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={generateNewBios}
                disabled={isGenerating}
                className="text-gray-600 hover:text-gray-700"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Regenerate
              </Button>
            </div>
            
            <div className="grid gap-3">
              {generatedBios.map((bio, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${accentColor} flex items-center justify-center text-white text-sm font-semibold`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed whitespace-pre-line text-gray-800 dark:text-gray-200 mb-3">
                        {bio}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => copyBio(bio)}
                        className={`w-full bg-gradient-to-r ${accentColor} text-white shadow-sm`}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Bio
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
