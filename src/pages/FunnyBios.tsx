import React, { useState } from 'react';
import { Copy, Laugh, Sparkles, Smile, Moon, Sun, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { GenerateNewBios } from "@/components/GenerateNewBios";
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";

const FunnyBios = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();

  const funnyBios = [
    "🤪 Professional overthinker\n🍕 Pizza is my love language\n😴 Napping is my cardio",
    "🦄 I'm not weird, I'm limited edition\n🍔 Relationship status: In love with food\n😂 My hobbies include laughing at my own jokes",
    "🤡 I put the 'fun' in dysfunctional\n🧠 My brain has too many tabs open\n☕ Coffee first, adulting second",
    "🐸 Kermit the Frog is my spirit animal\n🎭 Life's too short to be serious\n🍰 Cake is always the answer",
    "🤖 Error 404: Motivation not found\n🎪 Certified mess but make it fashion\n🌮 Taco 'bout a good time",
    "🦖 Rawr means I love you in dinosaur\n🎨 Painting my life with chaos\n🍿 Popcorn enthusiast & Netflix expert"
  ];

  const copyBio = (bio: string) => {
    navigator.clipboard.writeText(bio);
    toast({
      title: "Bio Copied! 😂",
      description: "Your funny bio is ready to make people laugh!"
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-yellow-50/30 to-orange-50/30'}`}>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Generator
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500">
                <Laugh className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-red-600 bg-clip-text text-transparent">
                Funny Instagram Bios
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Make your followers laugh with these hilarious Instagram bios! Stand out with humor and personality 
              that shows your fun side. Copy and paste these funny bios to bring smiles to your profile.
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
          bioType="funny"
          gradientColors="from-white via-yellow-50/30 to-orange-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50"
          accentColor="from-orange-500 to-yellow-500"
        />

        {/* Funny Bios Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {funnyBios.map((bio, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                    Funny Bio #{index + 1}
                  </span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                    Hilarious
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm whitespace-pre-line">
                  {bio}
                </div>
                <Button 
                  onClick={() => copyBio(bio)} 
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Bio
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-yellow-50/20 to-orange-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                How to Write Funny Instagram Bios That Get Engagement
              </h2>
              
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <p>
                  Funny Instagram bios are one of the best ways to show your personality and make a memorable first impression. 
                  Humor breaks the ice, makes you more relatable, and encourages people to follow you for more entertaining content.
                </p>

                <h3 className="text-2xl font-semibold text-orange-600 dark:text-orange-400 mt-8 mb-4">
                  Types of Funny Bio Humor
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Self-Deprecating</h4>
                    <p className="text-sm">Making fun of yourself in a charming way</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Observational</h4>
                    <p className="text-sm">Funny takes on everyday situations</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Wordplay</h4>
                    <p className="text-sm">Puns and clever word combinations</p>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-2">Absurdist</h4>
                    <p className="text-sm">Random and unexpected humor</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-orange-600 dark:text-orange-400 mt-8 mb-4">
                  Tips for Writing Funny Bios
                </h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Smile className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                    <span><strong>Know Your Audience:</strong> Make sure your humor matches your followers' sense of humor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Laugh className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <span><strong>Keep It Light:</strong> Avoid controversial topics and focus on universal experiences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Use Emojis Wisely:</strong> Emojis can enhance the comedic effect of your bio</span>
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

export default FunnyBios;
