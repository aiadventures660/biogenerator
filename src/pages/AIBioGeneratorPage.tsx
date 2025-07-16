
import React, { useState } from 'react';
import { Wand2, Sparkles, Zap, Brain, Moon, Sun, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { AIBioGenerator } from "@/components/AIBioGenerator";
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";

const AIBioGeneratorPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [generatedBio, setGeneratedBio] = useState('');
  const { toast } = useToast();

  const handleBioGenerated = (bio: string) => {
    setGeneratedBio(bio);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30'}`}>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Generator
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Instagram Bio Generator
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to create unique, personalized Instagram bios. 
              Our AI bio generator creates custom content tailored to your personality, interests, and style.
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Generator */}
          <div>
            <AIBioGenerator onBioGenerated={handleBioGenerated} />
          </div>

          {/* AI Features */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      AI-Powered Features
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
                      Advanced technology for perfect bios
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Wand2 className="h-5 w-5 text-cyan-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Smart Personalization</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">AI analyzes your inputs to create bios that match your personality</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Instant Generation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get multiple unique bio options in seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Context Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">AI considers trends, audience, and platform best practices</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How AI Bio Generation Works */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  How Our AI Creates Perfect Bios
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Input Analysis</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">AI processes your interests, profession, and style preferences</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Pattern Recognition</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Identifies successful bio structures and trending elements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Creative Generation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Combines data to create unique, engaging bio content</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Optimization</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Ensures optimal length, emoji placement, and readability</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        
        <div className="mt-12">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-cyan-50/20 to-blue-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Why Choose AI for Instagram Bio Generation?
              </h2>
              
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <p>
                  Traditional bio writing can be time-consuming and challenging. Our AI Instagram bio generator 
                  leverages machine learning to understand what makes bios successful and creates personalized 
                  content that resonates with your target audience.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">🎯 Targeted Content</h4>
                    <p className="text-sm">AI creates bios specifically tailored to your niche and audience</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">⚡ Speed & Efficiency</h4>
                    <p className="text-sm">Generate multiple bio options in seconds, not hours</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">🧠 Smart Learning</h4>
                    <p className="text-sm">AI continuously learns from successful bio patterns</p>
                  </div>
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

export default AIBioGeneratorPage;
