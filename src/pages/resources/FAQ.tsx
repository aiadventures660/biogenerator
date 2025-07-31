import { useState } from 'react';
import { Header } from '@/components/Header';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Star,
  Clock,
  Users,
  Shield,
  Smartphone,
  Type,
  Image,
  Link,
  TrendingUp,
  Eye,
  Heart
} from 'lucide-react';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const faqCategories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'general', label: 'General', icon: MessageCircle },
    { id: 'features', label: 'Features', icon: Star },
    { id: 'optimization', label: 'Optimization', icon: TrendingUp },
    { id: 'technical', label: 'Technical', icon: Smartphone }
  ];

  const faqs = [
    {
      category: 'general',
      question: 'What is a social media bio and why is it important?',
      answer: 'A social media bio is a short description that appears on your profile page. It\'s your chance to make a first impression, tell people who you are, what you do, and why they should follow you. A well-crafted bio can increase your followers, drive traffic to your website, and help you achieve your social media goals.',
      tags: ['basics', 'importance', 'definition'],
      popularity: 'high'
    },
    {
      category: 'features',
      question: 'How does the AI Bio Generator work?',
      answer: 'Our AI Bio Generator uses advanced natural language processing to create personalized bios based on your input. Simply provide information about yourself, your profession, interests, and goals. The AI analyzes successful bio patterns and generates multiple options tailored to your specific needs and target audience.',
      tags: ['ai', 'generator', 'how-to'],
      popularity: 'high'
    },
    {
      category: 'optimization',
      question: 'What are the character limits for different social media platforms?',
      answer: 'Character limits vary by platform: Instagram (150 characters), Twitter/X (160 characters), TikTok (80 characters), LinkedIn (120 characters for headline), Facebook (101 characters), and YouTube (1000 characters). Our tools automatically optimize your bio for each platform\'s specific requirements.',
      tags: ['limits', 'platforms', 'optimization'],
      popularity: 'high'
    },
    {
      category: 'features',
      question: 'Can I use special fonts and symbols in my bio?',
      answer: 'Yes! Our Fancy Font Styles feature offers 20+ different Unicode font styles that work across all social media platforms. We also provide a comprehensive Symbol Library with emojis, special characters, and decorative elements to make your bio stand out visually.',
      tags: ['fonts', 'symbols', 'styling'],
      popularity: 'medium'
    },
    {
      category: 'optimization',
      question: 'How often should I update my social media bio?',
      answer: 'We recommend reviewing your bio monthly and updating it whenever you have major life changes, new achievements, or launch new projects. Keep it fresh with current information, seasonal content, or trending topics relevant to your niche. Regular updates can boost engagement and show you\'re active.',
      tags: ['updates', 'frequency', 'maintenance'],
      popularity: 'medium'
    },
    {
      category: 'technical',
      question: 'Do the generated bios work on all social media platforms?',
      answer: 'Yes, our bios are designed to be compatible with all major social media platforms including Instagram, Twitter/X, TikTok, LinkedIn, Facebook, YouTube, and more. We ensure proper formatting and character compliance for each platform\'s specific requirements.',
      tags: ['compatibility', 'platforms', 'technical'],
      popularity: 'medium'
    },
    {
      category: 'general',
      question: 'What makes a social media bio effective?',
      answer: 'An effective bio should: clearly state who you are and what you do, include relevant keywords for discoverability, show your personality, include a call-to-action, use proper formatting with line breaks and emojis, provide contact information when relevant, and be regularly updated with fresh content.',
      tags: ['effectiveness', 'best-practices', 'tips'],
      popularity: 'high'
    },
    {
      category: 'features',
      question: 'What bio templates are available?',
      answer: 'We offer templates for various categories: Business (entrepreneurs, consultants, coaches), Creative (artists, photographers, writers), Personal (lifestyle, travel, food), Influencer (beauty, fitness, tech), and Professional (corporate, academic, healthcare). Each template is customizable and optimized for engagement.',
      tags: ['templates', 'categories', 'options'],
      popularity: 'medium'
    },
    {
      category: 'optimization',
      question: 'How can I make my bio more discoverable?',
      answer: 'Include relevant keywords your target audience searches for, use trending hashtags (1-2 maximum), mention your location if relevant, include your niche or industry terms, use your real name or brand name, and ensure your username matches your other social profiles for consistency.',
      tags: ['seo', 'discoverability', 'keywords'],
      popularity: 'medium'
    },
    {
      category: 'technical',
      question: 'Can I save and edit my generated bios?',
      answer: 'While our current version doesn\'t require accounts, you can copy and save bios locally. We recommend keeping a note with different versions to test which performs best. Future updates will include user accounts with bio saving and editing capabilities.',
      tags: ['saving', 'editing', 'features'],
      popularity: 'low'
    },
    {
      category: 'general',
      question: 'Should I include contact information in my bio?',
      answer: 'Include contact information if you want to receive business inquiries, collaborations, or direct contact. For business accounts, definitely include email or website. For personal accounts, it\'s optional. Always prioritize your safety and privacy when sharing contact details.',
      tags: ['contact', 'privacy', 'business'],
      popularity: 'medium'
    },
    {
      category: 'optimization',
      question: 'How do I track my bio performance?',
      answer: 'Monitor metrics like profile visits, link clicks, follower growth rate, engagement rate, and direct messages. Most platforms provide built-in analytics. Test different bio versions and track which generates more engagement, follows, or website traffic to optimize performance.',
      tags: ['analytics', 'metrics', 'tracking'],
      popularity: 'medium'
    },
    {
      category: 'features',
      question: 'What is the Live Preview feature?',
      answer: 'Our Live Preview feature shows how your bio will look on different social media platforms in real-time. It displays character counts, formatting, and visual appearance across Instagram, Twitter, TikTok, LinkedIn, and other platforms, helping you optimize for each platform\'s unique layout.',
      tags: ['preview', 'platforms', 'visualization'],
      popularity: 'low'
    },
    {
      category: 'general',
      question: 'Can I use the same bio across all platforms?',
      answer: 'While you can use similar content, it\'s better to customize for each platform\'s audience and character limits. Professional networks like LinkedIn need more formal language, while Instagram and TikTok can be more casual and creative. Adapt your tone and content to match each platform\'s culture.',
      tags: ['platforms', 'customization', 'strategy'],
      popularity: 'medium'
    },
    {
      category: 'technical',
      question: 'Is my data secure when using the bio generator?',
      answer: 'Yes, we prioritize your privacy and security. We don\'t store personal information permanently, don\'t share data with third parties, use secure connections (HTTPS), and process information locally when possible. Your bio content is only used to generate suggestions and isn\'t retained.',
      tags: ['security', 'privacy', 'data'],
      popularity: 'low'
    },
    {
      category: 'optimization',
      question: 'What are the common bio mistakes to avoid?',
      answer: 'Avoid: being too generic or vague, using outdated information, overloading with hashtags, having no clear value proposition, ignoring your target audience, using poor grammar or spelling, being overly promotional, and forgetting to include a call-to-action when appropriate.',
      tags: ['mistakes', 'avoid', 'common-errors'],
      popularity: 'medium'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqs.filter(faq => faq.popularity === 'high');

  const quickAnswers = [
    {
      question: 'How long should my bio be?',
      answer: 'Use 80-150 characters for maximum impact',
      icon: Type
    },
    {
      question: 'Should I use emojis?',
      answer: 'Yes, 1-3 emojis can increase engagement by 25%',
      icon: Heart
    },
    {
      question: 'How often to update?',
      answer: 'Review monthly, update for major changes',
      icon: Clock
    },
    {
      question: 'Include website link?',
      answer: 'Always include if you want traffic/conversions',
      icon: Link
    }
  ];

  const handleContactSupport = () => {
    toast({
      title: "Contact Support",
      description: "We'll get back to you within 24 hours!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Everything you need to know about creating perfect social media bios
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-4 h-4" />
                {faqs.length} questions answered
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Updated daily
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                Community driven
              </span>
            </div>
          </div>

          {/* Quick Answers */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Quick Answers
              </CardTitle>
              <CardDescription>
                Instant answers to the most common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {quickAnswers.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                        <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {item.question}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search questions, answers, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex justify-center gap-2 flex-wrap">
              {faqCategories.map((category) => {
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

          {/* Most Popular Questions */}
          {selectedCategory === 'all' && searchTerm === '' && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Most Popular Questions
                </CardTitle>
                <CardDescription>
                  The questions everyone asks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {popularFAQs.map((faq, index) => (
                    <AccordionItem key={`popular-${index}`} value={`popular-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                          {faq.question}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300">
                        {faq.answer}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {faq.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}

          {/* All FAQs */}
          <Card>
            <CardHeader>
              <CardTitle>
                {searchTerm || selectedCategory !== 'all' ? 'Search Results' : 'All Questions'}
              </CardTitle>
              <CardDescription>
                {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
                {selectedCategory !== 'all' && ` in ${faqCategories.find(c => c.id === selectedCategory)?.label}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No questions found matching your search.</p>
                  <p className="text-sm">Try a different search term or browse all categories.</p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={index.toString()} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-start gap-2">
                          <Badge 
                            variant={faq.popularity === 'high' ? 'default' : faq.popularity === 'medium' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {faq.category}
                          </Badge>
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300">
                        {faq.answer}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {faq.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>

          {/* Support Section */}
          <Card className="mt-8">
            <CardContent className="text-center p-8">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Can't find what you're looking for? Our support team is here to help!
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={handleContactSupport} className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Support
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Join Community
                </Button>
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Response within 24 hours
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    100% Privacy protected
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
