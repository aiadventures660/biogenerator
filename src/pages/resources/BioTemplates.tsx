import React, { useState } from 'react';
import { BookOpen, Copy, ArrowLeft, Search, Tag, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";
import { useToast } from "@/hooks/use-toast";

const BioTemplates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();

  const bioExamples = [
    {
      id: 1,
      category: 'Creative',
      title: 'Artist Profile',
      bio: `🎨 Visual Artist & Creative Director\n✨ Bringing imagination to life\n🌍 Based in NYC | Working worldwide\n📧 hello@artist.com\n👇 Latest collection`,
      engagement: 'High',
      length: 'Medium',
      difficulty: 'Easy'
    },
    {
      id: 2,
      category: 'Business',
      title: 'CEO Executive',
      bio: `🚀 CEO & Founder @TechStartup\n💼 Building tomorrow's solutions today\n📈 Scaling businesses globally\n🎯 Investor & Mentor\n📩 partnerships@company.com`,
      engagement: 'High',
      length: 'Medium',
      difficulty: 'Medium'
    },
    {
      id: 3,
      category: 'Influencer',
      title: 'Lifestyle Influencer',
      bio: `✨ Lifestyle & Fashion Enthusiast\n📍 LA ➡️ NYC ➡️ World\n💕 Sharing daily inspiration\n🛍️ Style tips & outfit inspo\n🔗 Shop my looks below`,
      engagement: 'Very High',
      length: 'Medium',
      difficulty: 'Easy'
    },
    {
      id: 4,
      category: 'Personal',
      title: 'Student Profile',
      bio: `📚 Psychology Student @UCLA\n🌱 Mental health advocate\n☕ Coffee addict & bookworm\n💭 Sharing my journey\n📖 Currently reading: [Book Title]`,
      engagement: 'Medium',
      length: 'Short',
      difficulty: 'Easy'
    },
    {
      id: 5,
      category: 'Professional',
      title: 'Marketing Expert',
      bio: `📊 Digital Marketing Strategist\n🎯 Helping brands grow online\n📱 Social Media Expert\n💡 Free marketing tips daily\n📩 DM for consultations`,
      engagement: 'High',
      length: 'Medium',
      difficulty: 'Medium'
    },
    {
      id: 6,
      category: 'Creative',
      title: 'Photographer',
      bio: `📸 Professional Photographer\n🌟 Capturing life's beautiful moments\n🎬 Available for events & portraits\n📍 San Francisco Bay Area\n📞 Book your session today`,
      engagement: 'High',
      length: 'Medium',
      difficulty: 'Easy'
    },
    {
      id: 7,
      category: 'Health',
      title: 'Fitness Coach',
      bio: `💪 Certified Personal Trainer\n🏋️‍♀️ Transforming lives through fitness\n🥗 Nutrition & wellness coach\n📱 Custom workout plans\n💬 Start your journey: DM me`,
      engagement: 'Very High',
      length: 'Medium',
      difficulty: 'Medium'
    },
    {
      id: 8,
      category: 'Food',
      title: 'Food Blogger',
      bio: `🍳 Home chef & recipe creator\n🌮 Authentic Mexican cuisine\n📝 Weekly recipes & cooking tips\n📍 Austin, TX\n👇 Today's special below`,
      engagement: 'High',
      length: 'Short',
      difficulty: 'Easy'
    },
    {
      id: 9,
      category: 'Tech',
      title: 'Software Developer',
      bio: `💻 Full-Stack Developer\n🚀 Building apps that matter\n⚡ React | Node.js | Python\n🔧 Open source contributor\n🌐 Portfolio: dev.website.com`,
      engagement: 'Medium',
      length: 'Short',
      difficulty: 'Medium'
    },
    {
      id: 10,
      category: 'Travel',
      title: 'Travel Blogger',
      bio: `✈️ Digital nomad | 40+ countries\n🌍 Sharing travel stories & tips\n📸 Solo female traveler\n🎒 Currently exploring: Thailand\n🗺️ Next stop: Vietnam`,
      engagement: 'Very High',
      length: 'Medium',
      difficulty: 'Easy'
    },
    {
      id: 11,
      category: 'Music',
      title: 'Musician',
      bio: `🎵 Singer-songwriter & Producer\n🎸 Indie folk with a modern twist\n🎧 New single out now\n🎤 Live shows & collaborations\n🔗 Listen on Spotify`,
      engagement: 'High',
      length: 'Short',
      difficulty: 'Easy'
    },
    {
      id: 12,
      category: 'Fashion',
      title: 'Fashion Designer',
      bio: `👗 Sustainable Fashion Designer\n🌿 Eco-friendly clothing line\n✂️ Custom pieces available\n📱 Behind the scenes content\n🛍️ Shop collection below`,
      engagement: 'High',
      length: 'Medium',
      difficulty: 'Medium'
    },
    {
      id: 13,
      category: 'Education',
      title: 'Online Teacher',
      bio: `📚 Math Teacher & Educator\n🎓 Making learning fun & accessible\n💡 Daily study tips & tricks\n👩‍🏫 Online tutoring available\n📝 Free worksheets in bio`,
      engagement: 'Medium',
      length: 'Medium',
      difficulty: 'Easy'
    },
    {
      id: 14,
      category: 'Personal',
      title: 'Mom Blogger',
      bio: `👶 Mom of 3 | Wife | Blogger\n💕 Real motherhood moments\n🏠 Organization & family tips\n☕ Surviving on coffee & love\n📝 Weekly blog posts`,
      engagement: 'High',
      length: 'Medium',
      difficulty: 'Easy'
    },
    {
      id: 15,
      category: 'Wellness',
      title: 'Yoga Instructor',
      bio: `🧘‍♀️ Certified Yoga Instructor\n🌅 Morning flow & meditation\n💆‍♀️ Mind-body wellness advocate\n🌸 Classes & retreats\n📱 Join my online sessions`,
      engagement: 'High',
      length: 'Medium',
      difficulty: 'Easy'
    }
  ];

  const categories = ['All', 'Creative', 'Business', 'Influencer', 'Personal', 'Professional', 'Health', 'Food', 'Tech', 'Travel', 'Music', 'Fashion', 'Education', 'Wellness'];

  const getFilteredExamples = () => {
    let filtered = selectedCategory === 'All' 
      ? bioExamples 
      : bioExamples.filter(example => example.category === selectedCategory);

    if (searchTerm) {
      filtered = filtered.filter(example => 
        example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const copyBio = async (bio: string, title: string) => {
    try {
      await navigator.clipboard.writeText(bio);
      toast({
        title: `${title} Bio Copied! ✨`,
        description: "Bio copied to clipboard! Customize it to make it yours."
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try copying manually.",
        variant: "destructive"
      });
    }
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'Very High': return 'bg-green-500';
      case 'High': return 'bg-blue-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredExamples = getFilteredExamples();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 dark:from-gray-900 dark:via-cyan-900/10 dark:to-blue-900/10">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bio Templates
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready-to-use bio examples with proven engagement. Browse by category, 
            copy what you like, and customize to match your style!
          </p>
        </div>

        {/* Search and Filter */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bio examples... (e.g., creative, business, travel)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.slice(0, 8).map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={selectedCategory === category ? "bg-cyan-600 hover:bg-cyan-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Bio Examples Grid */}
        {filteredExamples.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No bio examples found matching your search.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {filteredExamples.map((example) => (
              <Card key={example.id} className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {example.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4 border">
                    <pre className="whitespace-pre-wrap text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed">
                      {example.bio}
                    </pre>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${getEngagementColor(example.engagement)}`}></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {example.engagement} engagement
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {example.length}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {example.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {example.bio.length} characters
                    </div>
                    <Button
                      onClick={() => copyBio(example.bio, example.title)}
                      size="sm"
                      className="bg-cyan-600 hover:bg-cyan-700"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy Bio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Analytics Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">High Engagement</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Templates proven to drive interactions
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Tag className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Multiple Categories</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Find the perfect style for your niche
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Easy to Customize</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Copy, edit, and make them uniquely yours
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Guide */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-cyan-600" />
              How to Use Bio Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">📋 Getting Started</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Browse templates by category or search</li>
                  <li>• Click "Copy Bio" to copy to clipboard</li>
                  <li>• Paste into your profile editor</li>
                  <li>• Customize with your personal details</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✨ Customization Tips</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Replace generic terms with your specifics</li>
                  <li>• Add your contact information</li>
                  <li>• Adjust emojis to match your style</li>
                  <li>• Keep your audience in mind</li>
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

export default BioTemplates;
