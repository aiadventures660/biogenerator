import { useState } from 'react';
import { Header } from '@/components/Header';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, Eye, Heart, MessageCircle, Share2, BookOpen, Lightbulb, Target, Users } from 'lucide-react';

export default function StyleGuide() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    toast({
      title: "Copied!",
      description: "Style tip copied to clipboard",
    });
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const styleCategories = [
    {
      id: 'formatting',
      title: 'Formatting & Structure',
      icon: BookOpen,
      tips: [
        {
          title: 'Use Line Breaks Strategically',
          description: 'Break your bio into digestible chunks using line breaks or bullet points',
          example: '✨ Creative Designer\n🎨 Coffee Lover\n📍 New York',
          impact: 'Increases readability by 40%'
        },
        {
          title: 'Emoji Placement',
          description: 'Place emojis at the beginning of lines or as separators',
          example: '🎯 Goal-oriented | 🚀 Innovation lover | 💡 Problem solver',
          impact: 'Improves visual appeal'
        },
        {
          title: 'Consistent Spacing',
          description: 'Maintain consistent spacing between elements',
          example: 'Designer • Creator • Dreamer\n\n📧 hello@example.com',
          impact: 'Creates professional look'
        }
      ]
    },
    {
      id: 'content',
      title: 'Content Strategy',
      icon: Target,
      tips: [
        {
          title: 'Value Proposition First',
          description: 'Lead with what you offer or your main identity',
          example: 'Helping brands tell their story through design',
          impact: 'Converts 25% better'
        },
        {
          title: 'Social Proof',
          description: 'Include credentials, followers, or achievements',
          example: 'Featured in Forbes • 50K+ students taught',
          impact: 'Builds trust instantly'
        },
        {
          title: 'Call to Action',
          description: 'End with a clear next step for followers',
          example: '👇 Download my free guide',
          impact: 'Increases engagement by 60%'
        }
      ]
    },
    {
      id: 'personality',
      title: 'Personality & Voice',
      icon: Heart,
      tips: [
        {
          title: 'Be Authentic',
          description: 'Use language that reflects your true personality',
          example: 'Awkward dancer, excellent baker, mediocre photographer',
          impact: 'Creates genuine connections'
        },
        {
          title: 'Show Vulnerability',
          description: 'Share relatable struggles or learning moments',
          example: 'Learning to code one bug at a time 🐛',
          impact: 'Increases relatability'
        },
        {
          title: 'Inject Humor',
          description: 'Use appropriate humor to make your bio memorable',
          example: 'Professional overthinker • Part-time plant killer',
          impact: 'Makes you memorable'
        }
      ]
    },
    {
      id: 'optimization',
      title: 'Platform Optimization',
      icon: Users,
      tips: [
        {
          title: 'Character Limits',
          description: 'Respect platform-specific character limits',
          example: 'Instagram: 150 chars\nTwitter: 160 chars\nLinkedIn: 120 chars',
          impact: 'Ensures full visibility'
        },
        {
          title: 'Keyword Integration',
          description: 'Include relevant keywords for discoverability',
          example: 'Digital Marketing Expert | SEO Specialist | Content Creator',
          impact: 'Improves searchability'
        },
        {
          title: 'Link Strategy',
          description: 'Use bio links strategically for different platforms',
          example: 'Instagram: Link in bio\nTwitter: Pinned tweet\nLinkedIn: Contact info',
          impact: 'Maximizes conversions'
        }
      ]
    }
  ];

  const brandingElements = [
    {
      title: 'Color Psychology',
      items: [
        { color: 'Blue', meaning: 'Trust, professionalism, reliability', use: 'Business bios' },
        { color: 'Green', meaning: 'Growth, nature, harmony', use: 'Health, environment' },
        { color: 'Purple', meaning: 'Creativity, luxury, mystery', use: 'Artists, brands' },
        { color: 'Orange', meaning: 'Energy, enthusiasm, warmth', use: 'Fitness, food' },
        { color: 'Pink', meaning: 'Compassion, nurturing, love', use: 'Beauty, lifestyle' }
      ]
    },
    {
      title: 'Typography Styles',
      items: [
        { style: 'Bold/Strong', meaning: 'Confidence, importance', use: 'Key achievements, names' },
        { style: 'Italic/Emphasis', meaning: 'Creativity, elegance', use: 'Quotes, taglines' },
        { style: 'ALL CAPS', meaning: 'Urgency, excitement', use: 'CTAs (use sparingly)' },
        { style: 'lowercase', meaning: 'Casual, approachable', use: 'Personal brands' }
      ]
    }
  ];

  const dosAndDonts = {
    dos: [
      'Keep it concise and scannable',
      'Update regularly with fresh content',
      'Use relevant hashtags strategically',
      'Include contact information',
      'Show your personality',
      'Use high-quality profile pictures',
      'Test different versions',
      'Include a clear value proposition'
    ],
    donts: [
      "Don't use too many emojis",
      "Don't make it too generic",
      "Don't forget to proofread",
      "Don't use outdated information",
      "Don't be overly promotional",
      "Don't use unclear abbreviations",
      "Don't ignore platform guidelines",
      "Don't copy others exactly"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Bio Style Guide
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Master the art of creating compelling social media bios that convert
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                Expert tips
              </span>
              <span className="flex items-center gap-1">
                <Lightbulb className="w-4 h-4" />
                Best practices
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Proven strategies
              </span>
            </div>
          </div>

          <Tabs defaultValue="tips" className="space-y-8">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
              <TabsTrigger value="tips">Style Tips</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            {/* Style Tips Tab */}
            <TabsContent value="tips" className="space-y-6">
              {styleCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Card key={category.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconComponent className="w-5 h-5" />
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {category.tips.map((tip, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {tip.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                  {tip.description}
                                </p>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {tip.impact}
                              </Badge>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                              <div className="flex justify-between items-start">
                                <code className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                  {tip.example}
                                </code>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(tip.example, `tip-${index}`)}
                                >
                                  {copiedItem === `tip-${index}` ? (
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
              })}
            </TabsContent>

            {/* Branding Tab */}
            <TabsContent value="branding" className="space-y-6">
              {brandingElements.map((element, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{element.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {element.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <span className="font-medium">{item.color || item.style}</span>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{item.meaning}</p>
                          </div>
                          <Badge variant="outline">{item.use}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Guidelines Tab */}
            <TabsContent value="guidelines" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600 dark:text-green-400">✅ Do's</CardTitle>
                    <CardDescription>Best practices to follow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {dosAndDonts.dos.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400">❌ Don'ts</CardTitle>
                    <CardDescription>Common mistakes to avoid</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {dosAndDonts.donts.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0">✗</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Examples Tab */}
            <TabsContent value="examples" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Before & After Examples</CardTitle>
                    <CardDescription>See how proper styling transforms bios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          before: "I am a photographer and I like taking pictures of nature and people. I have been doing this for 5 years and I am good at it. Contact me for bookings.",
                          after: "📸 Nature & Portrait Photographer\n✨ 5 years capturing life's moments\n🌿 Featured in National Geographic\n📧 bookings@example.com",
                          improvements: ["Added emojis for visual appeal", "Used line breaks for structure", "Included social proof", "Clear contact information"]
                        },
                        {
                          before: "Fitness trainer, nutritionist, lifestyle coach, motivational speaker, entrepreneur, dog lover",
                          after: "💪 Transforming lives through fitness\n🥗 Certified Nutritionist & Lifestyle Coach\n🎤 Motivational Speaker | Entrepreneur\n🐕 Dog dad to Max",
                          improvements: ["Focused on value proposition", "Better formatting", "Personality addition", "Reduced keyword stuffing"]
                        }
                      ].map((example, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">❌ Before</h4>
                              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-sm">
                                {example.before}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">✅ After</h4>
                              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm whitespace-pre-wrap">
                                {example.after}
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Key Improvements:</h5>
                            <ul className="text-sm space-y-1">
                              {example.improvements.map((improvement, improvementIndex) => (
                                <li key={improvementIndex} className="flex items-center gap-2">
                                  <Check className="w-3 h-3 text-green-600" />
                                  {improvement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <Card className="mt-12 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardContent className="text-center p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Create Your Perfect Bio?</h3>
              <p className="mb-6 opacity-90">
                Apply these style guidelines with our bio generation tools
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="secondary" size="lg">
                  Try AI Generator
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-purple-600">
                  Browse Templates
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
