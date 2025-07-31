import { useState } from 'react';
import { Header } from '@/components/Header';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Copy, 
  Check, 
  Search, 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle,
  Share2,
  Zap,
  Star,
  Clock,
  Bookmark
} from 'lucide-react';

export default function TipsAndTricks() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    toast({
      title: "Copied!",
      description: "Tip copied to clipboard",
    });
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const tipsCategories = [
    {
      id: 'engagement',
      title: 'Boost Engagement',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      tips: [
        {
          title: 'Ask Questions in Your Bio',
          description: 'End your bio with an engaging question to encourage comments',
          example: '🎨 Digital Artist | What\'s your favorite color palette? 👇',
          difficulty: 'Easy',
          impact: '+40% Comments',
          category: 'engagement'
        },
        {
          title: 'Use Call-to-Action Emojis',
          description: 'Guide followers with directional emojis and action words',
          example: '📚 Author | New book out now! ⬇️ Link below',
          difficulty: 'Easy',
          impact: '+25% Link Clicks',
          category: 'engagement'
        },
        {
          title: 'Share Your Current Status',
          description: 'Keep your bio fresh with what you\'re currently working on',
          example: '🎵 Musician | Currently recording my debut album 🎤',
          difficulty: 'Medium',
          impact: '+30% Engagement',
          category: 'engagement'
        },
        {
          title: 'Include Conversation Starters',
          description: 'Mention shared interests or experiences to spark connections',
          example: '☕ Coffee addict | Fellow plant parent? Let\'s chat! 🌱',
          difficulty: 'Easy',
          impact: '+35% DMs',
          category: 'engagement'
        }
      ]
    },
    {
      id: 'growth',
      title: 'Accelerate Growth',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      tips: [
        {
          title: 'Cross-Platform Promotion',
          description: 'Mention your presence on other platforms to build ecosystem',
          example: '🎥 YouTuber | TikTok: @username | Podcast on Spotify 🎧',
          difficulty: 'Medium',
          impact: '+50% Cross-Platform',
          category: 'growth'
        },
        {
          title: 'Leverage Trending Hashtags',
          description: 'Research and include 1-2 trending hashtags relevant to your niche',
          example: '💪 Fitness Coach | #FitnessMotivation #HealthyLifestyle',
          difficulty: 'Easy',
          impact: '+20% Discoverability',
          category: 'growth'
        },
        {
          title: 'Partner Mentions',
          description: 'Tag collaborators or mention partnerships for credibility',
          example: '📸 Photographer | Partnered with @brandname | Portfolio ⬇️',
          difficulty: 'Medium',
          impact: '+60% Trust',
          category: 'growth'
        },
        {
          title: 'Geographic Targeting',
          description: 'Include location to attract local followers and opportunities',
          example: '🍕 Food Blogger | NYC Eats | Local recommendations 📍',
          difficulty: 'Easy',
          impact: '+45% Local Reach',
          category: 'growth'
        }
      ]
    },
    {
      id: 'conversion',
      title: 'Increase Conversions',
      icon: Target,
      color: 'from-blue-500 to-indigo-500',
      tips: [
        {
          title: 'Create Urgency',
          description: 'Use time-sensitive language to encourage immediate action',
          example: '🎓 Online Course Creator | Early bird pricing ends Friday! ⏰',
          difficulty: 'Medium',
          impact: '+70% Conversions',
          category: 'conversion'
        },
        {
          title: 'Offer Value Upfront',
          description: 'Promise immediate value to encourage link clicks',
          example: '💼 Career Coach | Free resume template in bio link ⬇️',
          difficulty: 'Easy',
          impact: '+55% Link Clicks',
          category: 'conversion'
        },
        {
          title: 'Social Proof Numbers',
          description: 'Include specific metrics to build trust and credibility',
          example: '📈 Marketing Expert | Helped 500+ businesses grow 2x',
          difficulty: 'Easy',
          impact: '+80% Trust',
          category: 'conversion'
        },
        {
          title: 'Clear Value Proposition',
          description: 'State exactly what followers will gain from following you',
          example: '🏠 Interior Designer | Daily home decor tips & inspiration',
          difficulty: 'Medium',
          impact: '+65% Follows',
          category: 'conversion'
        }
      ]
    },
    {
      id: 'professional',
      title: 'Professional Branding',
      icon: Users,
      color: 'from-purple-500 to-violet-500',
      tips: [
        {
          title: 'Industry Keywords',
          description: 'Include searchable terms relevant to your profession',
          example: '💻 Full Stack Developer | React | Node.js | Python',
          difficulty: 'Easy',
          impact: '+40% Search Visibility',
          category: 'professional'
        },
        {
          title: 'Thought Leadership',
          description: 'Position yourself as an expert with authoritative language',
          example: '📊 Data Scientist | Transforming data into business insights',
          difficulty: 'Medium',
          impact: '+50% Professional Inquiries',
          category: 'professional'
        },
        {
          title: 'Achievement Highlights',
          description: 'Mention awards, publications, or notable accomplishments',
          example: '✍️ Journalist | Published in NY Times | Pulitzer Finalist',
          difficulty: 'Easy',
          impact: '+90% Credibility',
          category: 'professional'
        },
        {
          title: 'Speaking & Events',
          description: 'Highlight speaking engagements or event participation',
          example: '🎤 Keynote Speaker | TEDx Alumni | Next event: Austin Tech Summit',
          difficulty: 'Medium',
          impact: '+75% Professional Opportunities',
          category: 'professional'
        }
      ]
    }
  ];

  const quickHacks = [
    {
      icon: Zap,
      title: 'Instant Bio Refresh',
      description: 'Add a single emoji at the start for immediate visual impact',
      time: '30 seconds'
    },
    {
      icon: Star,
      title: 'Power Words',
      description: 'Replace "I am" with action words like "Creating", "Building", "Helping"',
      time: '1 minute'
    },
    {
      icon: Clock,
      title: 'Timing Updates',
      description: 'Update your bio during peak hours (6-9 PM) for maximum visibility',
      time: '2 minutes'
    },
    {
      icon: Bookmark,
      title: 'A/B Testing',
      description: 'Try different versions weekly and track which performs better',
      time: '5 minutes'
    }
  ];

  const platformSpecificTips = {
    instagram: [
      'Use the maximum 150 characters effectively',
      'Include 1-2 relevant hashtags',
      'Add your location if it\'s relevant',
      'Use line breaks for readability',
      'Include a clear call-to-action'
    ],
    twitter: [
      'Keep it under 160 characters',
      'Pin important tweets for context',
      'Use your header image for additional info',
      'Include your location in profile',
      'Link to your most important content'
    ],
    linkedin: [
      'Use all 120 characters in the headline',
      'Include relevant keywords for search',
      'Mention your current company/role',
      'Add industry-specific terms',
      'Include contact information'
    ],
    tiktok: [
      'Keep it fun and personality-driven',
      'Mention your content themes',
      'Include posting schedule if consistent',
      'Use trending slang appropriately',
      'Add collaborator tags'
    ]
  };

  const filteredTips = tipsCategories.flatMap(category => 
    category.tips.filter(tip => 
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(tip => ({ ...tip, categoryTitle: category.title, categoryColor: category.color }))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Tips & Tricks
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Proven strategies to maximize your social media bio performance
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Lightbulb className="w-4 h-4" />
                Expert insights
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Actionable tips
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Growth tactics
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tips and tricks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="tips" className="space-y-8">
            <TabsList className="grid grid-cols-3 w-full max-w-lg mx-auto">
              <TabsTrigger value="tips">All Tips</TabsTrigger>
              <TabsTrigger value="quick">Quick Hacks</TabsTrigger>
              <TabsTrigger value="platform">By Platform</TabsTrigger>
            </TabsList>

            {/* All Tips Tab */}
            <TabsContent value="tips" className="space-y-6">
              {searchTerm ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {filteredTips.length} result{filteredTips.length !== 1 ? 's' : ''} for "{searchTerm}"
                  </h3>
                  <div className="grid gap-4">
                    {filteredTips.map((tip, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {tip.title}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                                {tip.description}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {tip.categoryTitle}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {tip.impact}
                              </Badge>
                              <Badge 
                                variant={tip.difficulty === 'Easy' ? 'default' : tip.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                                className="text-xs"
                              >
                                {tip.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                            <div className="flex justify-between items-start">
                              <code className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {tip.example}
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(tip.example, `search-${index}`)}
                              >
                                {copiedItem === `search-${index}` ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                tipsCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card key={category.id} className="overflow-hidden">
                      <CardHeader className={`bg-gradient-to-r ${category.color} text-white`}>
                        <CardTitle className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5" />
                          {category.title}
                        </CardTitle>
                        <CardDescription className="text-white/90">
                          {category.tips.length} expert tips
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid gap-4">
                          {category.tips.map((tip, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                    {tip.title}
                                  </h4>
                                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    {tip.description}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {tip.impact}
                                  </Badge>
                                  <Badge 
                                    variant={tip.difficulty === 'Easy' ? 'default' : tip.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                                    className="text-xs"
                                  >
                                    {tip.difficulty}
                                  </Badge>
                                </div>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                                <div className="flex justify-between items-start">
                                  <code className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {tip.example}
                                  </code>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(tip.example, `${category.id}-${index}`)}
                                  >
                                    {copiedItem === `${category.id}-${index}` ? (
                                      <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </TabsContent>

            {/* Quick Hacks Tab */}
            <TabsContent value="quick" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Quick Bio Hacks
                  </CardTitle>
                  <CardDescription>
                    Fast improvements you can make right now
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {quickHacks.map((hack, index) => {
                      const IconComponent = hack.icon;
                      return (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                              <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {hack.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {hack.description}
                              </p>
                              <Badge variant="outline" className="text-xs mt-2">
                                {hack.time}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth Metrics to Track</CardTitle>
                  <CardDescription>
                    Monitor these metrics to measure bio performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { metric: 'Profile Visits', icon: Eye, description: 'Track how many people view your profile' },
                      { metric: 'Link Clicks', icon: Target, description: 'Monitor clicks on your bio link' },
                      { metric: 'Follower Growth', icon: Users, description: 'Measure new followers gained' },
                      { metric: 'Engagement Rate', icon: Heart, description: 'Track likes, comments, and shares' },
                      { metric: 'DM Inquiries', icon: MessageCircle, description: 'Count direct message conversations' },
                      { metric: 'Mentions', icon: Share2, description: 'Monitor when others tag you' }
                    ].map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={index} className="text-center p-4 border rounded-lg">
                          <IconComponent className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            {item.metric}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {item.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Platform-Specific Tab */}
            <TabsContent value="platform" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(platformSpecificTips).map(([platform, tips]) => (
                  <Card key={platform}>
                    <CardHeader>
                      <CardTitle className="capitalize flex items-center gap-2">
                        {platform === 'instagram' && '📷'}
                        {platform === 'twitter' && '🐦'}
                        {platform === 'linkedin' && '💼'}
                        {platform === 'tiktok' && '🎵'}
                        {platform}
                      </CardTitle>
                      <CardDescription>
                        Platform-specific optimization tips
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <Card className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardContent className="text-center p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Apply These Tips?</h3>
              <p className="mb-6 opacity-90">
                Use our tools to implement these strategies in your bio
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="secondary" size="lg">
                  Generate Bio
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                  View Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
