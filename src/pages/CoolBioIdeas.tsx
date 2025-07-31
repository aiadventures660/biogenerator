
import React, { useState, useEffect } from 'react';
import { Copy, Star, Zap, RefreshCw, Loader2, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CoolBioHeader } from "@/components/cool-bio/CoolBioHeader";
import { BioCategoriesGrid } from "@/components/cool-bio/BioCategoriesGrid";
import { PopularSearchTerms } from "@/components/cool-bio/PopularSearchTerms";
import { CoolBioGuide } from "@/components/cool-bio/CoolBioGuide";
import { Header } from "@/components/Header";
import { BioCategoryNavbar } from "@/components/BioCategoryNavbar";
import Footer from "@/components/ui/footer";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { supabase } from "@/integrations/supabase/client";

const CoolBioIdeas = () => {
  const { darkMode } = useDarkMode();
  const { toast } = useToast();
  const [coolBios, setCoolBios] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Default fallback bios in case AI generation fails
  const fallbackBios = [
    "✨ Living my best life\n🌟 Creating magic daily\n💫 Dream big, shine bright\n🔮 Good vibes only ✌️",
    "🎯 Chasing dreams & catching flights\n☕ Coffee addict & adventure seeker\n📸 Life through my lens\n🌈 Spreading positivity everywhere",
    "🚀 Future CEO in the making\n💎 Sparkling with ambition\n🌸 Blooming where I'm planted\n✨ Watch me glow up",
    "🎨 Artist by day, dreamer by night\n🌙 Moon child with stardust dreams\n💝 Spreading love & creativity\n🦋 Transforming daily",
    "🎵 Music is my language\n🌻 Sunflower soul\n💃 Dancing through life\n🌟 Shining my own light",
    "📚 Bookworm & coffee lover\n🌿 Plant mom & proud\n✨ Finding magic in mundane\n💛 Radiating good energy"
  ];

  const generateCoolBios = async () => {
    try {
      console.log('Attempting to generate AI cool bios...');
      const { data, error } = await supabase.functions.invoke('generate-bio', {
        body: {
          interests: 'creativity, self-expression, lifestyle, adventures, dreams, positivity',
          profession: 'creative, artist, influencer, student, free spirit, entrepreneur',
          personality: 'trendy, unique, expressive, confident, inspiring, cool',
          tone: 'Trendy',
          style: 'Emoji Rich',
          bioType: 'cool'
        }
      });

      console.log('Supabase response:', { data, error });

      // Check if there's an actual error or invalid response
      if (error) {
        console.error('Supabase function error:', error);
        setCoolBios(fallbackBios);
        
        toast({
          title: "Using Curated Cool Bios ✨",
          description: "AI generation temporarily unavailable. Showing our handpicked bios.",
          variant: "default",
        });
        
        return fallbackBios;
      }

      if (!data?.bios || !Array.isArray(data.bios) || data.bios.length === 0) {
        console.warn('Invalid or empty bios response:', data);
        setCoolBios(fallbackBios);
        
        toast({
          title: "Using Curated Cool Bios ✨",
          description: "AI generation returned empty results. Showing our handpicked bios.",
          variant: "default",
        });
        
        return fallbackBios;
      }

      // AI generation successful!
      console.log('AI cool bios generated successfully:', data.bios);
      const allBios = [...data.bios];
      
      if (allBios.length < 6) {
        try {
          const { data: data2, error: error2 } = await supabase.functions.invoke('generate-bio', {
            body: {
              interests: 'fashion, music, travel, photography, art, self-love',
              profession: 'content creator, designer, blogger, photographer, artist',
              personality: 'stylish, authentic, adventurous, passionate, creative, vibrant',
              tone: 'Trendy',
              style: 'Emoji Rich',
              bioType: 'cool'
            }
          });

          if (!error2 && data2?.bios && Array.isArray(data2.bios)) {
            allBios.push(...data2.bios);
          }
        } catch (secondError) {
          // Silently continue with what we have
        }
      }

      const uniqueBios = Array.from(new Set(allBios)).slice(0, 6);
      setCoolBios(uniqueBios);
      
      toast({
        title: "Fresh Cool Bios Generated! ✨",
        description: `Created ${uniqueBios.length} new AI-generated cool bios for you.`,
      });

      return uniqueBios;
    } catch (error) {
      // Use fallback bios if AI generation fails
      setCoolBios(fallbackBios);
      
      toast({
        title: "Using Curated Cool Bios ✨",
        description: "Showing our handpicked trendy bios for you.",
        variant: "default",
      });

      return fallbackBios;
    }
  };

  // Generate new bios on component mount (page load/refresh)
  useEffect(() => {
    const initializeBios = async () => {
      setIsLoading(true);
      await generateCoolBios();
      setIsLoading(false);
    };

    initializeBios();
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to manually regenerate bios
  const handleRegenerateBios = async () => {
    setIsRegenerating(true);
    await generateCoolBios();
    setIsRegenerating(false);
  };

  const copyBio = (bio: string) => {
    navigator.clipboard.writeText(bio);
    toast({
      title: "Bio Copied! ✨",
      description: "Your cool bio is ready to make you stand out!"
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30'}`}>
      <Header />
      <BioCategoryNavbar />
      <div className="container mx-auto px-3 lg:px-4 py-6 lg:py-8 max-w-6xl">
        <CoolBioHeader />

        {/* AI-Generated Cool Bios Grid */}
        <div className="mb-8 px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                AI-Generated Cool Bio Ideas
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                Fresh & Trendy
              </Badge>
            </div>
            
            <Button
              onClick={handleRegenerateBios}
              disabled={isRegenerating || isLoading}
              variant="outline"
              size="sm"
              className="text-orange-600 border-orange-200 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-600 dark:hover:bg-orange-900/20"
            >
              {isRegenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New
                </>
              )}
            </Button>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="shadow-lg border-0 bg-gradient-to-br from-white via-orange-50/30 to-red-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="h-6 bg-orange-200 dark:bg-orange-700 rounded animate-pulse w-32"></div>
                      <div className="h-6 bg-orange-100 dark:bg-orange-800 rounded animate-pulse w-16"></div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-10 bg-orange-200 dark:bg-orange-700 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {coolBios.map((bio, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white via-orange-50/30 to-red-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                        AI Bio #{index + 1}
                      </span>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                        AI-Generated
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm whitespace-pre-line">
                      {bio}
                    </div>
                    <Button 
                      onClick={() => copyBio(bio)} 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Bio
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <BioCategoriesGrid />

        <div className="px-4">
          <PopularSearchTerms />

          <CoolBioGuide />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoolBioIdeas;
