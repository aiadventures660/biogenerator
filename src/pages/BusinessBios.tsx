import React, { useState, useEffect } from 'react';
import { Copy, Briefcase, TrendingUp, Target, ArrowLeft, RefreshCw, Loader2, Sparkles } from 'lucide-react';
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

const BusinessBios = () => {
  const { darkMode } = useDarkMode();
  const { toast } = useToast();
  const [businessBios, setBusinessBios] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isUsingAI, setIsUsingAI] = useState(false); // Track if we're using AI or curated bios

  // Default fallback bios in case AI generation fails
  const fallbackBios = [
    "🚀 Digital Marketing Expert\n📈 Helping brands grow online\n💼 DM for collaborations\n🔗 link.bio/yourname",
    "👨‍💼 CEO & Founder @YourCompany\n💡 Innovation meets execution\n🌟 Transforming ideas into reality\n📧 hello@yourcompany.com",
    "📊 Business Consultant\n🎯 Strategic solutions for growth\n💪 Empowering entrepreneurs\n📱 Book a free consultation ⬇️",
    "🎨 Creative Director & Designer\n✨ Bringing brands to life\n🖥️ Available for projects\n🌐 www.yourportfolio.com",
    "💻 Tech Entrepreneur\n🔧 Building the future\n🚀 Startup mentor & investor\n💬 Let's connect!",
    "📸 Professional Photographer\n🎭 Capturing moments that matter\n📅 Bookings open\n💌 contact@yourname.com"
  ];

  const generateBusinessBios = async () => {
    try {
      console.log('Attempting to generate AI business bios...');
      const { data, error } = await supabase.functions.invoke('generate-bio', {
        body: {
          interests: 'business growth, networking, leadership, entrepreneurship, professional development',
          profession: 'CEO, founder, consultant, business owner, professional',
          personality: 'professional, authoritative, trustworthy, results-oriented, ambitious',
          tone: 'Professional',
          style: 'Clean Text',
          bioType: 'business'
        }
      });

      console.log('Supabase response:', { data, error });

      // Check if there's an actual error or invalid response
      if (error) {
        console.error('Supabase function error:', error);
        setBusinessBios(fallbackBios);
        setIsUsingAI(false); // Using curated bios
        
        toast({
          title: "Using Curated Business Bios 💼",
          description: "AI generation temporarily unavailable. Showing our handpicked bios.",
          variant: "default",
        });
        
        return fallbackBios;
      }

      if (!data?.bios || !Array.isArray(data.bios) || data.bios.length === 0) {
        console.warn('Invalid or empty bios response:', data);
        setBusinessBios(fallbackBios);
        setIsUsingAI(false); // Using curated bios
        
        toast({
          title: "Using Curated Business Bios 💼",
          description: "AI generation returned empty results. Showing our handpicked bios.",
          variant: "default",
        });
        
        return fallbackBios;
      }

      // AI generation successful!
      console.log('AI business bios generated successfully:', data.bios);
      setIsUsingAI(true); // Using AI-generated bios
      const allBios = [...data.bios];
      
      if (allBios.length < 6) {
        try {
          const { data: data2, error: error2 } = await supabase.functions.invoke('generate-bio', {
            body: {
              interests: 'marketing, sales, consulting, coaching, digital transformation',
              profession: 'executive, director, manager, expert, specialist',
              personality: 'confident, strategic, innovative, goal-oriented, professional',
              tone: 'Professional',
              style: 'Clean Text',
              bioType: 'business'
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
      setBusinessBios(uniqueBios);
      
      toast({
        title: "Fresh Business Bios Generated! 💼",
        description: `Created ${uniqueBios.length} new AI-generated business bios for you.`,
      });

      return uniqueBios;
    } catch (error) {
      console.error('Exception during business AI generation:', error);
      // Use fallback bios if AI generation fails
      setBusinessBios(fallbackBios);
      setIsUsingAI(false); // Using curated bios
      
      toast({
        title: "Using Curated Business Bios 💼",
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
      await generateBusinessBios();
      setIsLoading(false);
    };

    initializeBios();
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to manually regenerate bios
  const handleRegenerateBios = async () => {
    setIsRegenerating(true);
    await generateBusinessBios();
    setIsRegenerating(false);
  };

  const copyBio = (bio: string) => {
    navigator.clipboard.writeText(bio);
    toast({
      title: "Bio Copied! 💼",
      description: "Your professional bio is ready to attract clients!"
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30'}`}>
      <Header />
      <BioCategoryNavbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Generator
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Business Instagram Bios
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional Instagram bios for business that drive results. Create compelling business profiles 
              that convert visitors into customers with these proven bio templates.
            </p>
          </div>
        </div>

        {/* AI-Generated Business Bios Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isUsingAI ? 'AI-Generated Business Bios' : 'Curated Business Bios'}
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                {isUsingAI ? 'Fresh & Professional' : 'Curated Collection'}
              </Badge>
            </div>
            
            <Button
              onClick={handleRegenerateBios}
              disabled={isRegenerating || isLoading}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-900/20"
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
                <Card key={index} className="shadow-lg border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="h-6 bg-blue-200 dark:bg-blue-700 rounded animate-pulse w-32"></div>
                      <div className="h-6 bg-blue-100 dark:bg-blue-800 rounded animate-pulse w-16"></div>
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
                    <div className="h-10 bg-blue-200 dark:bg-blue-700 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {businessBios.map((bio, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        AI Bio #{index + 1}
                      </span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
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
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
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
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI-Powered Business Instagram Bios
              </h2>
              
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🤖 AI-Generated Fresh Content</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Every time you visit or refresh this page, our AI creates brand new business bios tailored specifically 
                        for professional networking and business growth. Get unique, conversion-focused bios every single time!
                      </p>
                    </div>
                  </div>
                </div>

                <p>
                  Professional Instagram bios are crucial for establishing credibility and attracting potential clients or partners. 
                  These AI-generated bios combine business expertise, clear value propositions, and strategic calls-to-action to maximize your professional impact.
                </p>

                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-8 mb-4">
                  Key Elements of Business Bios
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Clear Value Proposition</h4>
                    <p className="text-sm">What you do and how you help clients</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Professional Credentials</h4>
                    <p className="text-sm">Your expertise and achievements</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Contact Information</h4>
                    <p className="text-sm">How potential clients can reach you</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Call to Action</h4>
                    <p className="text-sm">Clear next steps for interested prospects</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-8 mb-4">
                  Tips for Professional Success
                </h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span><strong>Professional Tone:</strong> Maintain credibility while showing personality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                    <span><strong>Results-Focused:</strong> Highlight achievements and measurable outcomes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <span><strong>Clear CTA:</strong> Make it easy for prospects to take the next step</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusinessBios;
