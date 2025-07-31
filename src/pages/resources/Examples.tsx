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
  Heart, 
  Star,
  TrendingUp,
  User,
  Briefcase,
  Palette,
  Camera,
  Music,
  Coffee,
  BookOpen,
  Dumbbell,
  Utensils
} from 'lucide-react';

export default function Examples() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    toast({
      title: "Copied!",
      description: "Bio example copied to clipboard",
    });
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const bioExamples = [
    {
      category: 'business',
      industry: 'Marketing',
      bio: '🚀 Digital Marketing Strategist\n📊 Helping brands grow 10x faster\n🎯 500+ successful campaigns\n📧 hello@marketpro.com',
      metrics: { engagement: '8.5%', followers: '25K', clicks: '12%' },
      highlights: ['Clear value proposition', 'Social proof with numbers', 'Professional contact'],
      difficulty: 'Professional'
    },
    {
      category: 'creative',
      industry: 'Photography',
      bio: '📸 Capturing life\'s beautiful moments\n🌅 Landscape • Portrait • Wedding\n📍 Based in San Francisco\n👇 Portfolio below',
      metrics: { engagement: '12.3%', followers: '18K', clicks: '15%' },
      highlights: ['Emotional appeal', 'Service clarity', 'Location targeting'],
      difficulty: 'Intermediate'
    },
    {
      category: 'personal',
      industry: 'Lifestyle',
      bio: '☕ Coffee enthusiast & morning person\n📚 Reading 52 books this year (23/52)\n🐕 Dog mom to Luna\n💌 Spreading good vibes daily',
      metrics: { engagement: '15.7%', followers: '8K', clicks: '18%' },
      highlights: ['Personality-driven', 'Progress tracking', 'Relatable content'],
      difficulty: 'Beginner'
    },
    {
      category: 'business',
      industry: 'Coaching',
      bio: '💡 Life Coach | TEDx Speaker\n✨ Transforming limiting beliefs into limitless potential\n🎯 Helped 1000+ clients achieve their goals\n🔗 Free masterclass ⬇️',
      metrics: { engagement: '10.2%', followers: '35K', clicks: '22%' },
      highlights: ['Authority building', 'Transformation promise', 'Lead magnet'],
      difficulty: 'Professional'
    },
    {
      category: 'creative',
      industry: 'Music',
      bio: '🎵 Singer-Songwriter | Producer\n🎸 Folk meets electronic vibes\n🎧 New single "Midnight Dreams" out now\n🎤 Booking: music@artist.com',
      metrics: { engagement: '14.1%', followers: '22K', clicks: '20%' },
      highlights: ['Genre description', 'Current release promotion', 'Business contact'],
      difficulty: 'Intermediate'
    },
    {
      category: 'business',
      industry: 'Fitness',
      bio: '💪 Certified Personal Trainer | Nutritionist\n🏋️‍♀️ Your transformation starts here\n📱 1M+ lives changed through fitness\n🔥 Free workout plan below',
      metrics: { engagement: '16.8%', followers: '450K', clicks: '25%' },
      highlights: ['Credentials showcase', 'Impact metrics', 'Free value offer'],
      difficulty: 'Professional'
    },
    {
      category: 'creative',
      industry: 'Art',
      bio: '🎨 Abstract Artist | Color Enthusiast\n🖼️ Painting emotions through bold strokes\n🌈 Commission work available\n🏛️ Featured in 15+ galleries',
      metrics: { engagement: '11.4%', followers: '12K', clicks: '16%' },
      highlights: ['Artistic style description', 'Service availability', 'Credibility markers'],
      difficulty: 'Intermediate'
    },
    {
      category: 'personal',
      industry: 'Food',
      bio: '🍝 Pasta lover & home chef\n👩‍🍳 Sharing family recipes & kitchen fails\n📍 Rome → NYC food journey\n🥧 Recipe of the week ⬇️',
      metrics: { engagement: '13.9%', followers: '16K', clicks: '19%' },
      highlights: ['Food passion', 'Authentic storytelling', 'Regular content promise'],
      difficulty: 'Beginner'
    },
    {
      category: 'business',
      industry: 'Technology',
      bio: '👨‍💻 Full Stack Developer | Open Source Contributor\n⚡ Building the future, one line at a time\n🔧 React | Node.js | Python\n💼 Available for freelance projects',
      metrics: { engagement: '7.2%', followers: '28K', clicks: '14%' },
      highlights: ['Technical skills', 'Mission statement', 'Availability status'],
      difficulty: 'Professional'
    },
    {
      category: 'personal',
      industry: 'Travel',
      bio: '✈️ Digital nomad exploring the world\n🗺️ 45 countries and counting\n📝 Travel tips & hidden gems\n🎒 Current location: Bali',
      metrics: { engagement: '18.5%', followers: '32K', clicks: '21%' },
      highlights: ['Lifestyle description', 'Achievement tracking', 'Current status'],
      difficulty: 'Intermediate'
    },
    {
      category: 'creative',
      industry: 'Writing',
      bio: '✍️ Author | Storyteller | Dreamer\n📖 3x bestselling novels published\n🌟 Words that inspire and heal\n📚 New book launching March 2024',
      metrics: { engagement: '9.8%', followers: '41K', clicks: '17%' },
      highlights: ['Multiple identities', 'Achievement showcase', 'Future projects'],
      difficulty: 'Professional'
    },
    {
      category: 'business',
      industry: 'Consulting',
      bio: '💼 Business Strategy Consultant\n📈 Scaling startups to 8-figure revenues\n🚀 Ex-McKinsey | Harvard MBA\n📅 Book a free strategy call',
      metrics: { engagement: '6.8%', followers: '19K', clicks: '28%' },
      highlights: ['Expertise clarity', 'Results-focused', 'Strong credentials'],
      difficulty: 'Professional'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Examples', icon: Star },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'creative', label: 'Creative', icon: Palette },
    { id: 'personal', label: 'Personal', icon: User }
  ];

  const industryIcons = {
    'Marketing': TrendingUp,
    'Photography': Camera,
    'Lifestyle': Heart,
    'Coaching': User,
    'Music': Music,
    'Fitness': Dumbbell,
    'Art': Palette,
    'Food': Utensils,
    'Technology': BookOpen,
    'Travel': Star,
    'Writing': BookOpen,
    'Consulting': Briefcase
  };

  const filteredExamples = bioExamples.filter(example => {
    const matchesCategory = selectedCategory === 'all' || example.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      example.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      example.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      example.highlights.some(highlight => highlight.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const topPerformers = bioExamples
    .sort((a, b) => parseFloat(b.metrics.engagement) - parseFloat(a.metrics.engagement))
    .slice(0, 3);

  const analysisTips = [
    {
      title: 'High Engagement Patterns',
      insights: [
        'Personal stories and vulnerability increase relatability',
        'Numbers and metrics build credibility',
        'Clear value propositions convert better',
        'Emotional language drives engagement'
      ]
    },
    {
      title: 'Common Success Elements',
      insights: [
        'Strong opening statement that defines identity',
        'Social proof through achievements or metrics',
        'Clear call-to-action or next step',
        'Personality elements that create connection'
      ]
    },
    {
      title: 'Industry-Specific Trends',
      insights: [
        'Creative fields: Emphasize style and portfolio',
        'Business profiles: Focus on results and ROI',
        'Personal brands: Show personality and values',
        'Service providers: Include contact information'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Bio Examples
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Real bio examples that convert, ranked by performance metrics
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {bioExamples.length} examples
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Performance metrics
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                Proven results
              </span>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search examples by industry, content, or style..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex justify-center gap-2 flex-wrap">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <Tabs defaultValue="examples" className="space-y-8">
            <TabsList className="grid grid-cols-3 w-full max-w-lg mx-auto">
              <TabsTrigger value="examples">All Examples</TabsTrigger>
              <TabsTrigger value="top">Top Performers</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            {/* All Examples Tab */}
            <TabsContent value="examples" className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Showing {filteredExamples.length} example{filteredExamples.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {filteredExamples.map((example, index) => {
                  const IndustryIcon = industryIcons[example.industry as keyof typeof industryIcons] || Star;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <IndustryIcon className="w-5 h-5" />
                              {example.industry}
                            </CardTitle>
                            <CardDescription className="capitalize">
                              {example.category} • {example.difficulty}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {example.metrics.engagement} engagement
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {example.metrics.followers}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Bio Display */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                              Bio Example
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(example.bio, `example-${index}`)}
                            >
                              {copiedItem === `example-${index}` ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          <div className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                            {example.bio}
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                              {example.metrics.engagement}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Engagement</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                              {example.metrics.followers}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Followers</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                              {example.metrics.clicks}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Link Clicks</div>
                          </div>
                        </div>

                        {/* Key Highlights */}
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                            Success Elements:
                          </h5>
                          <div className="flex flex-wrap gap-1">
                            {example.highlights.map((highlight, highlightIndex) => (
                              <Badge key={highlightIndex} variant="outline" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Top Performers Tab */}
            <TabsContent value="top" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-yellow-500" />
                    Highest Performing Bios
                  </CardTitle>
                  <CardDescription>
                    Top 3 examples ranked by engagement rate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {topPerformers.map((example, index) => {
                      const IndustryIcon = industryIcons[example.industry as keyof typeof industryIcons] || Star;
                      const rankColors = ['text-yellow-500', 'text-gray-400', 'text-orange-500'];
                      const rankBgs = ['bg-yellow-100 dark:bg-yellow-900/20', 'bg-gray-100 dark:bg-gray-800', 'bg-orange-100 dark:bg-orange-900/20'];
                      
                      return (
                        <div key={index} className="border rounded-lg p-6 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full ${rankBgs[index]} flex items-center justify-center`}>
                                <span className={`font-bold ${rankColors[index]}`}>#{index + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                  <IndustryIcon className="w-4 h-4" />
                                  {example.industry}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                                  {example.category} • {example.difficulty}
                                </p>
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-lg font-bold">
                              {example.metrics.engagement}
                            </Badge>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                Bio Example
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(example.bio, `top-${index}`)}
                              >
                                {copiedItem === `top-${index}` ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                            <div className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                              {example.bio}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {example.highlights.map((highlight, highlightIndex) => (
                              <Badge key={highlightIndex} variant="outline" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6">
              <div className="grid gap-6">
                {analysisTips.map((section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {section.insights.map((insight, insightIndex) => (
                          <li key={insightIndex} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Benchmarks</CardTitle>
                  <CardDescription>
                    Average metrics across all examples in our database
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        12.1%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Average Engagement Rate
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Industry benchmark: 1-3%
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                        18.2%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Average Link Click Rate
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Industry benchmark: 2-5%
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        85%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Include Call-to-Action
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Most successful bios
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <Card className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <CardContent className="text-center p-8">
              <h3 className="text-2xl font-bold mb-4">Inspired by These Examples?</h3>
              <p className="mb-6 opacity-90">
                Create your own high-converting bio using our tools and templates
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="secondary" size="lg">
                  Start Creating
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-indigo-600">
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
