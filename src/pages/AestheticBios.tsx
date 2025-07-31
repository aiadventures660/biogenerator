import React, { useState, useEffect } from 'react';
import { Copy, Palette, Sparkles, Heart, ArrowLeft, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import { BioCategoryNavbar } from "@/components/BioCategoryNavbar";
import Footer from "@/components/ui/footer";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { supabase } from "@/integrations/supabase/client";

const AestheticBios = () => {
  const { darkMode } = useDarkMode();
  const { toast } = useToast();
  const [aestheticBios, setAestheticBios] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isUsingAI, setIsUsingAI] = useState(false); // Track if we're using AI or curated bios

  // Default fallback bios in case AI generation fails
  const fallbackBios = [
    "✨ living in my own little world ✨\n🌙 dream big, sparkle more 🌙\n💫 creating magic daily 💫",
    "🦋 soft aesthetic vibes 🦋\n🌸 pink sunsets & golden hours 🌸\n✨ finding beauty in simplicity ✨",
    "🤍 minimalist soul 🤍\n🌿 plant mama & coffee lover 🌿\n📚 lost in books & daydreams 📚",
    "🌙 moon child at heart 🌙\n💎 diamonds in my mind 💎\n🦋 butterfly transformations 🦋",
    "🌸 soft pink aesthetic 🌸\n☁️ head in the clouds ☁️\n✨ manifesting my dreams ✨",
    "🤎 brown girl magic 🤎\n🌻 sunflower soul 🌻\n💫 golden hour goddess 💫"
  ];

  const generateAestheticBios = async () => {
    try {
      console.log('Attempting to generate AI bios...');
      const { data, error } = await supabase.functions.invoke('generate-bio', {
        body: {
          interests: 'aesthetic lifestyle, minimalism, self-care, artistic expression',
          profession: 'content creator, influencer, lifestyle enthusiast',
          personality: 'dreamy, artistic, minimalist vibes with soft colors and beautiful imagery',
          tone: 'Aesthetic',
          style: 'With Emojis',
          bioType: 'aesthetic'
        }
      });

      console.log('Supabase response:', { data, error });

      // Check if there's an actual error or invalid response
      if (error) {
        console.error('Supabase function error:', error);
        setAestheticBios(fallbackBios);
        setIsUsingAI(false); // Using curated bios
        
        toast({
          title: "Using Curated Aesthetic Bios ✨",
          description: "AI generation temporarily unavailable. Showing our handpicked bios.",
          variant: "default",
        });
        
        return fallbackBios;
      }

      if (!data?.bios || !Array.isArray(data.bios) || data.bios.length === 0) {
        console.warn('Invalid or empty bios response:', data);
        setAestheticBios(fallbackBios);
        setIsUsingAI(false); // Using curated bios
        
        toast({
          title: "Using Curated Aesthetic Bios ✨",
          description: "AI generation returned empty results. Showing our handpicked bios.",
          variant: "default",
        });
        
        return fallbackBios;
      }

      // AI generation successful!
      console.log('AI bios generated successfully:', data.bios);
      setIsUsingAI(true); // Using AI-generated bios
      const allBios = [...data.bios];
      
      if (allBios.length < 6) {
        try {
          const { data: data2, error: error2 } = await supabase.functions.invoke('generate-bio', {
            body: {
              interests: 'aesthetic lifestyle, photography, mindfulness, creativity',
              profession: 'digital creator, artist, lifestyle blogger',
              personality: 'ethereal, peaceful, inspiring with dreamy aesthetic vibes',
              tone: 'Aesthetic',
              style: 'With Emojis',
              bioType: 'aesthetic'
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
      setAestheticBios(uniqueBios);
      
      toast({
        title: "Fresh Aesthetic Bios Generated! ✨",
        description: `Created ${uniqueBios.length} new AI-generated aesthetic bios for you.`,
      });

      return uniqueBios;
    } catch (error) {
      console.error('Exception during AI generation:', error);
      // Use fallback bios if AI generation fails
      setAestheticBios(fallbackBios);
      setIsUsingAI(false); // Using curated bios
      
      toast({
        title: "Using Curated Aesthetic Bios ✨",
        description: "AI service temporarily unavailable. Showing our handpicked bios.",
        variant: "default",
      });

      return fallbackBios;
    }
  };

  // Generate new bios on component mount (page load/refresh)
  useEffect(() => {
    const initializeBios = async () => {
      setIsLoading(true);
      await generateAestheticBios();
      setIsLoading(false);
    };

    initializeBios();
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to manually regenerate bios
  const handleRegenerateBios = async () => {
    setIsRegenerating(true);
    await generateAestheticBios();
    setIsRegenerating(false);
  };

  const copyBio = (bio: string) => {
    navigator.clipboard.writeText(bio);
    toast({
      title: "Bio Copied! ✨",
      description: "Your aesthetic bio is ready to paste on Instagram!"
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30'}`}>
      <Header />
      <BioCategoryNavbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Generator
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Aesthetic Instagram Bios
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the most beautiful aesthetic Instagram bios that will make your profile stand out. 
              Copy and paste these carefully crafted aesthetic bios to express your unique style.
            </p>
          </div>
        </div>

        {/* AI-Generated Aesthetic Bios Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isUsingAI ? 'AI-Generated Aesthetic Bios' : 'Curated Aesthetic Bios'}
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                {isUsingAI ? 'Fresh & Unique' : 'Curated Collection'}
              </Badge>
            </div>
            
            <Button
              onClick={handleRegenerateBios}
              disabled={isRegenerating || isLoading}
              variant="outline"
              size="sm"
              className="text-purple-600 border-purple-200 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-600 dark:hover:bg-purple-900/20"
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
                <Card key={index} className="shadow-lg border-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="h-6 bg-purple-200 dark:bg-purple-700 rounded animate-pulse w-32"></div>
                      <div className="h-6 bg-purple-100 dark:bg-purple-800 rounded animate-pulse w-16"></div>
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
                    <div className="h-10 bg-purple-200 dark:bg-purple-700 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {aestheticBios.map((bio, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                        AI Bio #{index + 1}
                      </span>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                        {isUsingAI ? 'AI-Generated' : 'Curated'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm whitespace-pre-line">
                      {bio}
                    </div>
                    <Button 
                      onClick={() => copyBio(bio)} 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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

        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI-Powered Aesthetic Instagram Bios
              </h2>
              
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                        {isUsingAI ? '🤖 AI-Generated Fresh Content' : '✨ Curated Collection'}
                      </h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        {isUsingAI 
                          ? 'Every time you visit or refresh this page, our AI creates brand new aesthetic bios tailored specifically for the aesthetic lifestyle. No more repetitive content - get unique, creative bios every single time!'
                          : 'Our carefully curated collection of aesthetic bios, handpicked by our team for their beauty and style. These premium bios are perfect for creating an aesthetic Instagram profile.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <p>
                  Aesthetic Instagram bios are all about creating a visual harmony that reflects your personality and style. 
                  These AI-generated bios combine beautiful emojis, meaningful words, and artistic formatting to create a cohesive look 
                  that matches your Instagram feed's aesthetic.
                </p>

                <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mt-8 mb-4">
                  Key Elements of Aesthetic Bios
                </h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <span><strong>Emoji Consistency:</strong> Use emojis that match your overall aesthetic theme</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                    <span><strong>Color Coordination:</strong> Choose emojis and symbols in complementary colors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Palette className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                    <span><strong>Visual Balance:</strong> Create symmetry and visual flow in your bio layout</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mt-8 mb-4">
                  Popular Aesthetic Bio Themes
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Soft Aesthetic</h4>
                    <p className="text-sm">Pastel colors, dreamy vibes, and gentle imagery</p>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-2">Minimalist</h4>
                    <p className="text-sm">Clean lines, simple emojis, and elegant spacing</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Dark Academia</h4>
                    <p className="text-sm">Scholarly vibes with book and coffee emojis</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Nature Lover</h4>
                    <p className="text-sm">Plant emojis, earth tones, and natural imagery</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AestheticBios;
