import React, { useState } from 'react';
import { Copy, Briefcase, TrendingUp, Target, Moon, Sun, ArrowLeft, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { GenerateNewBios } from "@/components/GenerateNewBios";
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";

const BusinessBios = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();

  const businessBios = [
    "🚀 Digital Marketing Expert\n📈 Helping brands grow online\n💼 DM for collaborations\n🔗 link.bio/yourname",
    "👨‍💼 CEO & Founder @YourCompany\n💡 Innovation meets execution\n🌟 Transforming ideas into reality\n📧 hello@yourcompany.com",
    "📊 Business Consultant\n🎯 Strategic solutions for growth\n💪 Empowering entrepreneurs\n📱 Book a free consultation ⬇️",
    "🎨 Creative Director & Designer\n✨ Bringing brands to life\n🖥️ Available for projects\n🌐 www.yourportfolio.com",
    "💻 Tech Entrepreneur\n🔧 Building the future\n🚀 Startup mentor & investor\n💬 Let's connect!",
    "📸 Professional Photographer\n🎭 Capturing moments that matter\n📅 Bookings open\n💌 contact@yourname.com"
  ];

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

          <Button 
            onClick={() => setDarkMode(!darkMode)} 
            variant="outline" 
            size="sm" 
            className="mt-6 mx-auto block"
          >
            {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {darkMode ? 'Light' : 'Dark'} Mode
          </Button>
        </div>

        {/* Generate New Bios Component */}
        <GenerateNewBios 
          bioType="business"
          gradientColors="from-white via-blue-50/30 to-indigo-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50"
          accentColor="from-blue-500 to-indigo-500"
        />

        {/* Business Bios Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {businessBios.map((bio, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    Business Bio #{index + 1}
                  </span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    Professional
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

        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                How to Create Effective Business Instagram Bios
              </h2>
              
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <p>
                  Your Instagram bio for business is often the first impression potential customers get of your brand. 
                  A well-crafted business bio can significantly impact your conversion rates and help establish 
                  credibility in your industry.
                </p>

                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-8 mb-4">
                  Essential Elements of Business Bios
                </h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span><strong>Clear Value Proposition:</strong> Immediately communicate what you do and how you help</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                    <span><strong>Contact Information:</strong> Make it easy for customers to reach you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <span><strong>Call-to-Action:</strong> Direct visitors to take the next step</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Professional Tone:</strong> Match your brand voice and industry standards</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-8 mb-4">
                  Business Bio Templates by Industry
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">E-commerce</h4>
                    <p className="text-sm">Product focus, shipping info, and shop links</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Service Provider</h4>
                    <p className="text-sm">Expertise highlight and booking information</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">B2B Company</h4>
                    <p className="text-sm">Industry solutions and contact details</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Creative Agency</h4>
                    <p className="text-sm">Portfolio showcase and collaboration invites</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mt-8">
                  <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-3">💡 Pro Tip for Business Bios</h4>
                  <p className="text-sm">
                    Include your location if you serve local customers, use relevant keywords for discoverability, 
                    and always include a link to your website or booking system. Update your bio regularly to 
                    reflect current promotions or services.
                  </p>
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

export default BusinessBios;
