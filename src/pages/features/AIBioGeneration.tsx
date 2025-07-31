import React, { useState } from 'react';
import { Brain, Wand2, Sparkles, Zap, ArrowLeft, Copy, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";
import { useToast } from "@/hooks/use-toast";

const AIBioGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('creative');
  const [generating, setGenerating] = useState(false);
  const [generatedBios, setGeneratedBios] = useState<string[]>([]);
  const [instantPreview, setInstantPreview] = useState('');
  const { toast } = useToast();

  const bioStyles = [
    { id: 'creative', label: 'Creative', icon: '🎨' },
    { id: 'professional', label: 'Professional', icon: '💼' },
    { id: 'funny', label: 'Funny', icon: '😄' },
    { id: 'aesthetic', label: 'Aesthetic', icon: '✨' },
    { id: 'minimal', label: 'Minimal', icon: '⚡' },
    { id: 'bold', label: 'Bold', icon: '🔥' }
  ];

  // Generate instant preview as user types
  const generateInstantPreview = (inputPrompt: string, selectedStyle: string) => {
    if (!inputPrompt.trim()) {
      setInstantPreview('');
      return;
    }

    const quickPreviews = {
      creative: `🎨 ${inputPrompt} | Creative soul ✨`,
      professional: `💼 ${inputPrompt} | Professional Excellence`,
      funny: `😄 ${inputPrompt} | Professional Goofball`,
      aesthetic: `✨ ${inputPrompt} | Aesthetic Dreamer`,
      minimal: `${inputPrompt} | Minimalist`,
      bold: `🔥 ${inputPrompt} | BOLD & FEARLESS`
    };

    const preview = quickPreviews[selectedStyle as keyof typeof quickPreviews] || quickPreviews.creative;
    setInstantPreview(preview);
  };

  // Update instant preview when prompt or style changes
  React.useEffect(() => {
    generateInstantPreview(prompt, style);
  }, [prompt, style]);

  // Quick generation without delay
  const quickGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Tell us about yourself to generate personalized bios!",
        variant: "destructive"
      });
      return;
    }

    // Instant generation with pre-built templates
    const quickTemplates = {
      creative: [
        `🎨 ${prompt} ✨\n🌈 Creative soul\n💫 Making magic happen`,
        `✨ ${prompt} | Artist\n🎭 Creativity is my superpower\n🌟 Living colorfully`,
        `🎪 ${prompt} enthusiast\n🎨 Creating beauty daily\n💫 Art meets life`
      ],
      professional: [
        `💼 ${prompt}\n🎯 Professional excellence\n📈 Results-driven`,
        `🏆 ${prompt} | Expert\n💡 Innovation leader\n🚀 Success focused`,
        `⚡ ${prompt} professional\n🎯 Strategic thinker\n💼 Excellence delivered`
      ],
      funny: [
        `😄 ${prompt}\n🎭 Professional comedian\n🍕 Powered by laughter`,
        `🤪 ${prompt} | Fun specialist\n😎 Making work fun\n🎈 Smile creator`,
        `🎉 ${prompt} enthusiast\n😂 Serious about fun\n🍕 Comedy central`
      ],
      aesthetic: [
        `✨ ${prompt}\n🌸 Soft vibes\n💫 Dreamy soul`,
        `🌙 ${prompt} | Dreamer\n🦋 Aesthetic heart\n✨ Beauty seeker`,
        `🌺 ${prompt} lover\n🌙 Moon child\n💫 Ethereal being`
      ],
      minimal: [
        `${prompt}\nSimple\n✨`,
        `${prompt}\nMinimal\n—`,
        `${prompt}\nLess is more\n•`
      ],
      bold: [
        `🔥 ${prompt}\n⚡ FEARLESS\n💥 UNSTOPPABLE`,
        `🚀 ${prompt}\n🔥 BOLD MOVES\n⚡ GAME CHANGER`,
        `💥 ${prompt}\n🚀 BOUNDARY BREAKER\n🔥 FIERCE & FREE`
      ]
    };

    const selectedTemplates = quickTemplates[style as keyof typeof quickTemplates] || quickTemplates.creative;
    setGeneratedBios(selectedTemplates);
    
    toast({
      title: "Quick Bios Ready! ⚡",
      description: "Generated in lightning speed!"
    });
  };

  const generateBios = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Tell us about yourself to generate personalized bios!",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    try {
      // Quick generation with minimal delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // More sophisticated bio generation based on style and prompt
      const bioTemplates = {
        creative: [
          `🎨 ${prompt} | Creative soul ✨\n🌈 Turning dreams into reality\n💫 Art is my language`,
          `✨ ${prompt} enthusiast\n🎭 Creating magic through creativity\n🌟 Living in full color`,
          `🎪 ${prompt} | Imagination unleashed\n🎨 Painting life with passion\n💫 Where creativity meets reality`
        ],
        professional: [
          `💼 ${prompt} | Professional Excellence\n🎯 Driving results through innovation\n📈 Your success partner`,
          `🏆 ${prompt} Expert\n💡 Delivering excellence every day\n🚀 Building tomorrow, today`,
          `⚡ ${prompt} | Strategic Leader\n🎯 Focused on meaningful impact\n💼 Excellence in every detail`
        ],
        funny: [
          `😄 ${prompt} | Professional Goofball\n🎭 Making life 10% funnier\n🍕 Powered by caffeine & dad jokes`,
          `🤪 ${prompt} | Chief Fun Officer\n😎 Taking life seriously... NOT!\n🎈 Spreading smiles daily`,
          `🎉 ${prompt} | Comedy in Progress\n😂 Turning awkward into awesome\n🍕 Life's too short for boring bios`
        ],
        aesthetic: [
          `✨ ${prompt} | Aesthetic Dreamer\n🌸 Soft vibes, strong mind\n💫 Living poetry in motion`,
          `🌙 ${prompt} enthusiast\n🦋 Chasing sunsets & dreams\n✨ Aesthetic soul, authentic heart`,
          `🌺 ${prompt} | Ethereal Being\n🌙 Moon child with stardust dreams\n💫 Beauty in simplicity`
        ],
        minimal: [
          `${prompt}\nLess is more\n✨`,
          `${prompt} | Minimalist\nSimplicity speaks\n—`,
          `${prompt}\nClean. Simple. Authentic.\n•`
        ],
        bold: [
          `🔥 ${prompt} | BOLD & FEARLESS\n⚡ Breaking boundaries daily\n💥 Unstoppable energy`,
          `🚀 ${prompt} | GAME CHANGER\n🔥 Bold moves, bigger dreams\n⚡ Redefining possible`,
          `💥 ${prompt} | FEARLESS LEADER\n🚀 Bold vision, unstoppable drive\n🔥 Making waves, not following them`
        ]
      };
      
      const selectedTemplates = bioTemplates[style as keyof typeof bioTemplates] || bioTemplates.creative;
      setGeneratedBios(selectedTemplates);
      
      toast({
        title: "Bios Generated! ✨",
        description: "Your AI-powered bios are ready!"
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const copyBio = async (bio: string) => {
    try {
      await navigator.clipboard.writeText(bio);
      toast({
        title: "Bio Copied! 📋",
        description: "Ready to paste on your profile!"
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try copying manually.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-pink-900/10">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              AI Bio Generation
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Harness the power of artificial intelligence to create unique, personalized bios. 
            Our AI understands your personality and creates content that truly represents you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-purple-600" />
                Generate Your Bio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Tell us about yourself</label>
                <Textarea
                  placeholder="e.g., I'm a photographer who loves traveling and coffee..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-3">Choose your style</label>
                <div className="grid grid-cols-2 gap-2">
                  {bioStyles.map((styleOption) => (
                    <button
                      key={styleOption.id}
                      onClick={() => setStyle(styleOption.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        style === styleOption.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{styleOption.icon}</span>
                        <span className="font-medium">{styleOption.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Instant Preview */}
              {instantPreview && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Instant Preview</span>
                  </div>
                  <div className="font-mono text-sm text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 rounded p-2">
                    {instantPreview}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={quickGenerate}
                  disabled={generating}
                  variant="outline"
                  className="flex-1 border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20"
                  size="lg"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Generate
                </Button>
                
                <Button 
                  onClick={generateBios}
                  disabled={generating}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  size="lg"
                >
                  {generating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Generate
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-pink-600" />
                Generated Bios
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generating ? (
                <div className="text-center py-12">
                  <div className="relative">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-purple-600 animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rounded-full animate-ping"></div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">AI is crafting your perfect bios...</p>
                  <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              ) : generatedBios.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your AI-generated bios will appear here</p>
                  <p className="text-sm mt-2">Enter your details and click generate to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {generatedBios.map((bio, index) => (
                    <div key={index} className="relative">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border">
                        <div className="flex items-start justify-between gap-2">
                          <pre className="whitespace-pre-wrap text-sm flex-1 font-mono">{bio}</pre>
                          <Button
                            onClick={() => copyBio(bio)}
                            size="sm"
                            variant="ghost"
                            className="shrink-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Badge variant="secondary" className="absolute -top-2 -left-2">
                        Bio {index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced algorithms create personalized content</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Multiple Styles</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Choose from various bio styles and personalities</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get multiple bio options in seconds</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AIBioGeneration;
