import React, { useState } from 'react';
import { FileText, Copy, ArrowLeft, Search, Star, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";
import { useToast } from "@/hooks/use-toast";

const TemplateCollection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();

  const templates = [
    {
      id: 1,
      category: 'Creative',
      title: 'Artist & Creator',
      template: `🎨 Digital Artist & Creative Soul\n✨ Turning imagination into reality\n📍 NYC | Available worldwide\n👇 Check out my latest work`,
      tags: ['creative', 'artist', 'design'],
      popularity: 5
    },
    {
      id: 2,
      category: 'Business',
      title: 'Entrepreneur',
      template: `💼 CEO & Founder @company\n🚀 Building the future of tech\n📈 Helping businesses grow\n💬 DM for collaborations`,
      tags: ['business', 'ceo', 'entrepreneur'],
      popularity: 5
    },
    {
      id: 3,
      category: 'Lifestyle',
      title: 'Travel Blogger',
      template: `✈️ Travel Enthusiast | 50+ countries\n📸 Capturing moments around the world\n🌍 Currently in: [Location]\n👇 Latest adventure below`,
      tags: ['travel', 'blogger', 'lifestyle'],
      popularity: 4
    },
    {
      id: 4,
      category: 'Fitness',
      title: 'Fitness Coach',
      template: `💪 Certified Personal Trainer\n🏋️‍♀️ Transforming lives through fitness\n🥗 Nutrition & Wellness Coach\n📱 Free workout plans ↓`,
      tags: ['fitness', 'health', 'trainer'],
      popularity: 4
    },
    {
      id: 5,
      category: 'Food',
      title: 'Food Blogger',
      template: `🍕 Food Lover & Recipe Creator\n👩‍🍳 Sharing delicious homemade meals\n📍 NYC Food Scene\n🔗 New recipes weekly`,
      tags: ['food', 'cooking', 'recipes'],
      popularity: 4
    },
    {
      id: 6,
      category: 'Creative',
      title: 'Photographer',
      template: `📷 Professional Photographer\n🌟 Capturing life's beautiful moments\n📍 Available for bookings\n💌 Contact: [email]`,
      tags: ['photography', 'creative', 'professional'],
      popularity: 5
    },
    {
      id: 7,
      category: 'Lifestyle',
      title: 'Mom Blogger',
      template: `👶 Mom of 2 | Wife | Blogger\n💕 Sharing family adventures\n🏠 Home organization tips\n📝 Honest motherhood stories`,
      tags: ['mom', 'family', 'parenting'],
      popularity: 4
    },
    {
      id: 8,
      category: 'Fashion',
      title: 'Fashion Influencer',
      template: `👗 Fashion Enthusiast & Stylist\n✨ Affordable style inspiration\n🛍️ Daily outfit posts\n💄 Beauty tips & reviews`,
      tags: ['fashion', 'style', 'beauty'],
      popularity: 5
    },
    {
      id: 9,
      category: 'Tech',
      title: 'Tech Reviewer',
      template: `💻 Tech Enthusiast & Reviewer\n📱 Latest gadget reviews\n🔧 Tech tips & tutorials\n🎥 YouTube: [channel]`,
      tags: ['technology', 'reviews', 'gadgets'],
      popularity: 3
    },
    {
      id: 10,
      category: 'Education',
      title: 'Online Teacher',
      template: `📚 Online Educator & Course Creator\n🎓 Teaching [Subject]\n💡 Making learning fun & easy\n🔗 Free resources below`,
      tags: ['education', 'teaching', 'learning'],
      popularity: 4
    },
    {
      id: 11,
      category: 'Creative',
      title: 'Music Producer',
      template: `🎵 Music Producer & Sound Engineer\n🎧 Creating beats that move souls\n🎹 Available for collaborations\n🔊 Latest track ↓`,
      tags: ['music', 'producer', 'audio'],
      popularity: 3
    },
    {
      id: 12,
      category: 'Minimal',
      title: 'Simple Professional',
      template: `[Name]\n[Profession]\n[Location]\n[Contact]`,
      tags: ['minimal', 'simple', 'professional'],
      popularity: 4
    },
    {
      id: 13,
      category: 'Fun',
      title: 'Comedy Creator',
      template: `😂 Making people laugh daily\n🎭 Comedy content creator\n🤪 Life's too short to be serious\n👇 Latest laughs below`,
      tags: ['comedy', 'funny', 'entertainment'],
      popularity: 4
    },
    {
      id: 14,
      category: 'Business',
      title: 'Consultant',
      template: `🎯 Business Strategy Consultant\n📊 Helping companies scale & grow\n💼 10+ years experience\n📧 Book a consultation`,
      tags: ['consulting', 'business', 'strategy'],
      popularity: 3
    },
    {
      id: 15,
      category: 'Lifestyle',
      title: 'Wellness Coach',
      template: `🧘‍♀️ Mindfulness & Wellness Coach\n💆‍♀️ Self-care advocate\n🌱 Living consciously\n✨ Free meditation guides ↓`,
      tags: ['wellness', 'mindfulness', 'selfcare'],
      popularity: 4
    }
  ];

  const categories = ['All', 'Creative', 'Business', 'Lifestyle', 'Fitness', 'Food', 'Fashion', 'Tech', 'Education', 'Minimal', 'Fun'];

  const getFilteredTemplates = () => {
    let filtered = selectedCategory === 'All' 
      ? templates 
      : templates.filter(template => template.category === selectedCategory);

    if (searchTerm) {
      filtered = filtered.filter(template => 
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered.sort((a, b) => b.popularity - a.popularity);
  };

  const copyTemplate = async (template: string, title: string) => {
    try {
      await navigator.clipboard.writeText(template);
      toast({
        title: `${title} Template Copied! ✨`,
        description: "Template copied to clipboard! Edit it to make it yours."
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try copying manually.",
        variant: "destructive"
      });
    }
  };

  const filteredTemplates = getFilteredTemplates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/30 dark:from-gray-900 dark:via-green-900/10 dark:to-blue-900/10">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 dark:text-green-400 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Template Collection
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional bio templates for every profession and personality. 
            Copy, customize, and make them uniquely yours!
          </p>
        </div>

        {/* Search and Filter */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search templates... (e.g., photographer, business, creative)"
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
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No templates found matching your search.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < template.popularity ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4 border">
                    <pre className="whitespace-pre-wrap text-sm font-mono text-gray-700 dark:text-gray-300">
                      {template.template}
                    </pre>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      onClick={() => copyTemplate(template.template, template.title)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">{templates.length}+</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Professional Templates</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{categories.length - 1}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Different Categories</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customizable</p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Guide */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              How to Use Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">📋 Quick Start</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Browse templates by category</li>
                  <li>• Click "Copy" to copy template</li>
                  <li>• Replace placeholders with your info</li>
                  <li>• Paste in your social media bio</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✨ Customization Tips</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Replace [placeholders] with your details</li>
                  <li>• Add your personal emoji style</li>
                  <li>• Adjust tone to match your brand</li>
                  <li>• Keep it concise and engaging</li>
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

export default TemplateCollection;
