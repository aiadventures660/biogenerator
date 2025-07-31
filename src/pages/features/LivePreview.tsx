import React, { useState, useEffect } from 'react';
import { Eye, Smartphone, Monitor, Tablet, ArrowLeft, Copy, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";
import { useToast } from "@/hooks/use-toast";

const LivePreview = () => {
  const [bioText, setBioText] = useState(`🌟 Social Media Creator & Influencer\n✨ Sharing daily inspiration\n📍 Los Angeles, CA\n💌 Collaborations: DM me\n👇 Latest content below`);
  const [previewMode, setPreviewMode] = useState('mobile');
  const [characterCount, setCharacterCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    setCharacterCount(bioText.length);
  }, [bioText]);

  const previewModes = [
    { id: 'mobile', label: 'Mobile', icon: Smartphone, width: 'max-w-sm' },
    { id: 'tablet', label: 'Tablet', icon: Tablet, width: 'max-w-md' },
    { id: 'desktop', label: 'Desktop', icon: Monitor, width: 'max-w-lg' }
  ];

  const platforms = [
    {
      name: 'Instagram',
      color: 'from-purple-600 to-pink-600',
      maxLength: 150,
      features: ['Clickable links in story highlights', 'One clickable link in bio', 'Hashtags work in comments']
    },
    {
      name: 'Twitter',
      color: 'from-blue-400 to-blue-600',
      maxLength: 160,
      features: ['Clickable links', 'Hashtags work', 'Mentions work', '@username display']
    },
    {
      name: 'TikTok',
      color: 'from-black to-gray-800',
      maxLength: 80,
      features: ['Very short limit', 'Links in bio', 'Simple formatting']
    },
    {
      name: 'LinkedIn',
      color: 'from-blue-600 to-blue-800',
      maxLength: 220,
      features: ['Professional tone preferred', 'Longer descriptions allowed', 'Skills & experience focus']
    }
  ];

  const copyBio = async () => {
    try {
      await navigator.clipboard.writeText(bioText);
      toast({
        title: "Bio Copied! ✨",
        description: "Your bio is ready to paste!"
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try copying manually.",
        variant: "destructive"
      });
    }
  };

  const generateSample = () => {
    const samples = [
      `🚀 Entrepreneur & Tech Enthusiast\n💡 Building the future, one app at a time\n📍 San Francisco Bay Area\n🔗 My latest project below`,
      `📸 Professional Photographer\n🌍 Capturing moments around the world\n✈️ Currently in: Tokyo\n📩 Bookings: email@example.com`,
      `🎨 Digital Artist & Creative Director\n✨ Turning dreams into visual stories\n🖼️ Commission work available\n👇 Portfolio highlights`,
      `💪 Certified Fitness Coach\n🏋️‍♀️ Your transformation starts here\n🥗 Nutrition tips & workout plans\n📱 Free consultation: DM me`,
      `📚 Educator & Course Creator\n🎓 Making learning fun and accessible\n💭 Educational content daily\n🔗 Free resources in bio link`
    ];
    
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    setBioText(randomSample);
  };

  const getCharacterStatus = (platform: any) => {
    const length = bioText.length;
    if (length <= platform.maxLength) {
      return { status: 'good', color: 'text-green-600' };
    } else if (length <= platform.maxLength + 20) {
      return { status: 'warning', color: 'text-yellow-600' };
    } else {
      return { status: 'error', color: 'text-red-600' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-900 dark:via-indigo-900/10 dark:to-purple-900/10">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Live Preview
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See exactly how your bio will look across different platforms and devices. 
            Edit in real-time and get instant feedback!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Editor Section */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-indigo-600" />
                  Bio Editor
                </CardTitle>
                <Button onClick={generateSample} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Sample
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  placeholder="Enter your bio text here..."
                  className="min-h-[150px] resize-none font-mono text-sm"
                  maxLength={500}
                />
                <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                  <span>{characterCount}/500 characters</span>
                  <Button onClick={copyBio} size="sm" variant="ghost">
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Bio
                  </Button>
                </div>
              </div>

              {/* Platform Character Limits */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Platform Limits:</h4>
                {platforms.map((platform) => {
                  const status = getCharacterStatus(platform);
                  return (
                    <div key={platform.name} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                      <span className="font-medium text-sm">{platform.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${status.color}`}>
                          {bioText.length}/{platform.maxLength}
                        </span>
                        <Badge 
                          variant={status.status === 'good' ? 'default' : status.status === 'warning' ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {status.status === 'good' ? 'Good' : status.status === 'warning' ? 'Close' : 'Too long'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-purple-600" />
                Live Preview
              </CardTitle>
              <div className="flex gap-2">
                {previewModes.map((mode) => {
                  const IconComponent = mode.icon;
                  return (
                    <Button
                      key={mode.id}
                      onClick={() => setPreviewMode(mode.id)}
                      variant={previewMode === mode.id ? "default" : "outline"}
                      size="sm"
                      className={previewMode === mode.id ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                    >
                      <IconComponent className="h-4 w-4 mr-1" />
                      {mode.label}
                    </Button>
                  );
                })}
              </div>
            </CardHeader>
            <CardContent>
              {/* Mobile Preview */}
              <div className={`mx-auto ${previewModes.find(mode => mode.id === previewMode)?.width} transition-all duration-300`}>
                {platforms.map((platform) => (
                  <div key={platform.name} className="mb-6">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${platform.color}`}></div>
                      {platform.name} Preview
                    </h4>
                    
                    {/* Platform-specific preview */}
                    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
                      {platform.name === 'Instagram' && (
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full"></div>
                            <div>
                              <div className="font-semibold text-sm">@yourusername</div>
                              <div className="text-xs text-gray-500">Your Name</div>
                            </div>
                          </div>
                          <div className="text-sm whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-700/50 p-3 rounded border">
                            {bioText}
                          </div>
                        </div>
                      )}
                      
                      {platform.name === 'Twitter' && (
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                            <div>
                              <div className="font-semibold text-sm">Your Name</div>
                              <div className="text-xs text-gray-500">@yourusername</div>
                            </div>
                          </div>
                          <div className="text-sm whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-700/50 p-3 rounded border">
                            {bioText}
                          </div>
                        </div>
                      )}
                      
                      {platform.name === 'TikTok' && (
                        <div>
                          <div className="text-center mb-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mx-auto mb-2"></div>
                            <div className="font-semibold">@yourusername</div>
                          </div>
                          <div className="text-sm text-center whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-700/50 p-3 rounded border">
                            {bioText.substring(0, platform.maxLength)}
                            {bioText.length > platform.maxLength && '...'}
                          </div>
                        </div>
                      )}
                      
                      {platform.name === 'LinkedIn' && (
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded"></div>
                            <div>
                              <div className="font-semibold">Your Name</div>
                              <div className="text-xs text-gray-500">Professional Title</div>
                            </div>
                          </div>
                          <div className="text-sm whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-700/50 p-3 rounded border">
                            {bioText}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-indigo-600" />
              Preview Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">📱 Multi-Device Testing</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Preview on mobile, tablet, and desktop</li>
                  <li>• Check text wrapping and formatting</li>
                  <li>• Ensure emojis display correctly</li>
                  <li>• Test link placement and visibility</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Platform Optimization</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Stay within character limits</li>
                  <li>• Use platform-specific features</li>
                  <li>• Consider audience expectations</li>
                  <li>• Test readability and impact</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default LivePreview;
