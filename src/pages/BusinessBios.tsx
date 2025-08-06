import React, { useState, useEffect } from 'react';
import { Copy, Briefcase, TrendingUp, Target, ArrowLeft, RefreshCw, Loader2, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import { BioCategoryNavbar } from "@/components/BioCategoryNavbar";
import Footer from "@/components/ui/footer";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { supabase } from "@/integrations/supabase/client";

const BusinessBios = () => {
  const { darkMode } = useDarkMode();
  const { toast } = useToast();
  const [businessBios, setBusinessBios] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isUsingAI, setIsUsingAI] = useState(false); // Track if we're using AI or curated bios
  const [previouslyGeneratedBios, setPreviouslyGeneratedBios] = useState<Set<string>>(new Set());

  // Helper function to normalize bio text for storage and comparison
  const normalizeBio = (bio: string): string => {
    return bio.trim().toLowerCase().replace(/\s+/g, ' ');
  };

  // Helper function to calculate edit distance between two strings
  const calculateEditDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) {
      matrix[0][i] = i;
    }
    
    for (let j = 0; j <= str2.length; j++) {
      matrix[j][0] = j;
    }
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1, // deletion
          matrix[j - 1][i] + 1, // insertion
          matrix[j - 1][i - 1] + indicator // substitution
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  // Helper function to filter out previously generated bios with ultra-strict similarity detection
  const getUniqueBios = (newBios: string[], previousBios: Set<string>): string[] => {
    return newBios.filter(bio => {
      const cleanBio = bio.trim().toLowerCase();
      const normalizedBio = normalizeBio(bio);
      
      // Check for exact matches first (both original and normalized)
      if (previousBios.has(bio.trim()) || previousBios.has(normalizedBio)) {
        console.log(`Bio filtered: exact match found`);
        return false;
      }
      
      // Check for similar content by comparing key phrases - ULTRA STRICT
      for (const prevBio of previousBios) {
        const cleanPrevBio = prevBio.toLowerCase();
        
        // Extract meaningful words (remove emojis and common words) - expanded filter list
        const commonWords = ['your', 'life', 'with', 'this', 'that', 'from', 'they', 'them', 'have', 'will', 'been', 'were', 'and', 'the', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'];
        
        const bioWords = cleanBio.replace(/[^\w\s]/g, ' ').split(/\s+/)
          .filter(word => word.length > 2 && !commonWords.includes(word));
        
        const prevBioWords = cleanPrevBio.replace(/[^\w\s]/g, ' ').split(/\s+/)
          .filter(word => word.length > 2 && !commonWords.includes(word));
        
        // Calculate similarity percentage - EXTREMELY STRICT (20% instead of 30%)
        const commonUniqueWords = bioWords.filter(word => prevBioWords.includes(word));
        const totalUniqueWords = Math.max(bioWords.length, prevBioWords.length);
        const similarity = totalUniqueWords > 0 ? (commonUniqueWords.length / totalUniqueWords) : 0;
        
        // If more than 20% similar, consider it a duplicate (was 30%)
        if (similarity > 0.2) {
          console.log(`Bio filtered due to high similarity: ${similarity.toFixed(2)} with previous bio`);
          console.log(`Current bio words: ${bioWords.join(', ')}`);
          console.log(`Previous bio words: ${prevBioWords.join(', ')}`);
          console.log(`Common words: ${commonUniqueWords.join(', ')}`);
          return false;
        }
        
        // Check for similar phrases (2+ consecutive words instead of 3+)
        const bioText = cleanBio.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ');
        const prevBioText = cleanPrevBio.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ');
        
        const bioBigrams = [];
        const prevBioBigrams = [];
        
        const bioWordsArray = bioText.split(' ').filter(word => word.length > 2);
        const prevBioWordsArray = prevBioText.split(' ').filter(word => word.length > 2);
        
        // Create bigrams (2-word phrases) for more strict checking
        for (let i = 0; i <= bioWordsArray.length - 2; i++) {
          bioBigrams.push(bioWordsArray.slice(i, i + 2).join(' '));
        }
        
        for (let i = 0; i <= prevBioWordsArray.length - 2; i++) {
          prevBioBigrams.push(prevBioWordsArray.slice(i, i + 2).join(' '));
        }
        
        // Check for common bigrams (2-word phrases)
        const commonBigrams = bioBigrams.filter(bigram => 
          prevBioBigrams.includes(bigram) && 
          !commonWords.some(word => bigram.includes(word))
        );
        
        if (commonBigrams.length > 0) {
          console.log(`Bio filtered due to common 2-word phrases: ${commonBigrams.join(', ')}`);
          return false;
        }
        
        // Also check for trigrams (3-word phrases) as before
        const bioTrigrams = [];
        const prevBioTrigrams = [];
        
        // Create trigrams (3-word phrases)
        for (let i = 0; i <= bioWordsArray.length - 3; i++) {
          bioTrigrams.push(bioWordsArray.slice(i, i + 3).join(' '));
        }
        
        for (let i = 0; i <= prevBioWordsArray.length - 3; i++) {
          prevBioTrigrams.push(prevBioWordsArray.slice(i, i + 3).join(' '));
        }
        
        // Check for common trigrams
        const commonTrigrams = bioTrigrams.filter(trigram => prevBioTrigrams.includes(trigram));
        if (commonTrigrams.length > 0) {
          console.log(`Bio filtered due to common 3-word phrases: ${commonTrigrams.join(', ')}`);
          return false;
        }
        
        // Additional check: Look for similar sentence structures or key phrases
        const bioSentences = bio.split(/[.!?\n]/).map(s => s.trim().toLowerCase()).filter(s => s.length > 10);
        const prevBioSentences = prevBio.split(/[.!?\n]/).map(s => s.trim().toLowerCase()).filter(s => s.length > 10);
        
        for (const bioSentence of bioSentences) {
          for (const prevSentence of prevBioSentences) {
            // Check if sentences are too similar (edit distance)
            const editDistance = calculateEditDistance(bioSentence, prevSentence);
            const maxLength = Math.max(bioSentence.length, prevSentence.length);
            const sentenceSimilarity = maxLength > 0 ? 1 - (editDistance / maxLength) : 0;
            
            if (sentenceSimilarity > 0.7) {
              console.log(`Bio filtered due to similar sentence structure: ${sentenceSimilarity.toFixed(2)}`);
              return false;
            }
          }
        }
      }
      
      return true;
    });
  };

  // Helper function to format any bio to exactly 3 lines
  const formatTo3Lines = (bio: string): string => {
    if (!bio) return '';
    
    // Remove excessive emojis and clean up
    let cleanBio = bio.trim();
    
    // Split by natural line breaks first
    let lines = cleanBio.split(/\n+/).map(line => line.trim()).filter(line => line.length > 0);
    
    // If we already have exactly 3 lines, return as is
    if (lines.length === 3) {
      return lines.join('\n');
    }
    
    // If we have fewer than 3 lines, we need to split or add content
    if (lines.length < 3) {
      // Try to split longer lines
      let allLines: string[] = [];
      
      for (const line of lines) {
        // If line is very long (>60 chars), try to split it
        if (line.length > 60) {
          // Look for natural break points (periods, semicolons, certain conjunctions)
          const breakPoints = ['. ', '• ', '| ', ' - ', ' • '];
          let found = false;
          
          for (const breakPoint of breakPoints) {
            const parts = line.split(breakPoint);
            if (parts.length >= 2) {
              // Rejoin with line breaks
              allLines.push(...parts.map((part, index) => {
                if (index === 0) return part.trim();
                return (part.startsWith(breakPoint.trim()) ? part : breakPoint.trim() + ' ' + part).trim();
              }).filter(part => part.length > 0));
              found = true;
              break;
            }
          }
          
          if (!found) {
            allLines.push(line);
          }
        } else {
          allLines.push(line);
        }
      }
      
      lines = allLines;
      
      // Don't add generic content - let AI generate authentic content
    }
    
    // If we have more than 3 lines, intelligently combine them
    if (lines.length > 3) {
      // Keep the first line, combine middle content, keep last if it's a good closer
      const firstLine = lines[0];
      const lastLine = lines[lines.length - 1];
      const middleLines = lines.slice(1, -1);
      
      // Check if last line is a good closing line (short and has certain keywords)
      const closingKeywords = ['dm', 'message', 'connect', 'follow', 'contact', 'reach out', 'collaboration', 'business', 'professional'];
      const isGoodClosing = lastLine.length < 50 && closingKeywords.some(keyword => 
        lastLine.toLowerCase().includes(keyword)
      );
      
      if (isGoodClosing) {
        // Combine middle lines into one line
        const middleLine = middleLines.join(' • ').trim();
        lines = [firstLine, middleLine, lastLine];
      } else {
        // Take first 3 lines
        lines = lines.slice(0, 3);
      }
    }
    
    // Final cleanup and return exactly 3 lines
    const finalLines = lines.slice(0, 3);
    return finalLines.join('\n');
  };

  const generateBusinessBios = async () => {
    try {
      console.log('Attempting to generate AI business bios...');
      
      // Use much more diverse parameter sets to ensure completely different content
      const parameterSets = [
        {
          interests: 'business growth, networking, leadership, entrepreneurship, professional development',
          profession: 'CEO, founder, consultant, business owner, professional',
          personality: 'professional, authoritative, trustworthy, results-oriented, ambitious',
          tone: 'Professional',
          style: 'Clean Text',
          bioType: 'business',
          format: '3-line',
          instructions: 'Create exactly 3 lines for Instagram bio format. Focus on business expertise and professional achievements.'
        },
        {
          interests: 'digital marketing, social media strategy, brand building, online presence, e-commerce',
          profession: 'digital marketer, social media manager, brand strategist, online entrepreneur',
          personality: 'innovative, creative, data-driven, strategic, forward-thinking',
          tone: 'Modern',
          style: 'Tech-Savvy',
          bioType: 'business',
          format: '3-line',
          instructions: 'Create exactly 3 lines for Instagram bio format. Emphasize digital expertise and modern business approach.'
        },
        {
          interests: 'finance, investment, wealth building, financial planning, market analysis',
          profession: 'financial advisor, investment banker, wealth manager, financial planner',
          personality: 'analytical, trustworthy, experienced, reliable, professional',
          tone: 'Authoritative',
          style: 'Financial',
          bioType: 'business',
          format: '3-line',
          instructions: 'Create exactly 3 lines for Instagram bio format. Highlight financial expertise and trustworthiness.'
        },
        {
          interests: 'coaching, mentoring, personal development, team building, organizational growth',
          profession: 'business coach, leadership consultant, mentor, organizational developer',
          personality: 'inspiring, motivational, experienced, supportive, transformational',
          tone: 'Inspirational',
          style: 'Coaching',
          bioType: 'business',
          format: '3-line',
          instructions: 'Create exactly 3 lines for Instagram bio format. Focus on coaching expertise and transformational impact.'
        },
        {
          interests: 'innovation, technology, startup culture, disruption, future trends',
          profession: 'tech entrepreneur, startup founder, innovation consultant, venture capitalist',
          personality: 'visionary, disruptive, innovative, bold, future-focused',
          tone: 'Visionary',
          style: 'Innovation',
          bioType: 'business',
          format: '3-line',
          instructions: 'Create exactly 3 lines for Instagram bio format. Emphasize innovation and entrepreneurial vision.'
        }
      ];

      let allBios: string[] = [];
      let attemptCount = 0;
      const maxAttempts = parameterSets.length;

      // Try different parameter sets until we get enough unique bios
      for (const params of parameterSets) {
        attemptCount++;
        console.log(`Attempt ${attemptCount}/${maxAttempts} with different parameters...`);
        
        const { data, error } = await supabase.functions.invoke('generate-bio', {
          body: params
        });

        if (!error && data?.bios && Array.isArray(data.bios)) {
          console.log(`Generated ${data.bios.length} bios in attempt ${attemptCount}`);
          allBios.push(...data.bios);
          
          // Filter for unique bios after each attempt
          const uniqueBios = getUniqueBios(allBios, previouslyGeneratedBios);
          console.log(`Unique bios so far: ${uniqueBios.length}`);
          
          // If we have enough unique bios, we can stop
          if (uniqueBios.length >= 6) {
            console.log('Sufficient unique bios generated, stopping early');
            break;
          }
        } else {
          console.warn(`Attempt ${attemptCount} failed:`, error);
        }
        
        // Small delay between attempts to avoid rate limiting
        if (attemptCount < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      console.log(`Total bios collected: ${allBios.length}`);

      // Filter out previously generated bios from all collected bios
      let uniqueNewBios = getUniqueBios(allBios, previouslyGeneratedBios);
      console.log(`Filtered to ${uniqueNewBios.length} unique bios`);

      // Format all bios to exactly 3 lines and take up to 6 unique bios
      const finalBios = uniqueNewBios.slice(0, 6).map(bio => formatTo3Lines(bio));
      
      if (finalBios.length === 0) {
        toast({
          title: "Bio Generation Failed",
          description: "Unable to generate unique business bios. Please try again.",
          variant: "destructive",
        });
        return [];
      }
      
      // Update the previously generated bios set
      const newPreviouslyGenerated = new Set(previouslyGeneratedBios);
      finalBios.forEach(bio => newPreviouslyGenerated.add(normalizeBio(bio)));
      setPreviouslyGeneratedBios(newPreviouslyGenerated);
      
      setBusinessBios(finalBios);
      setIsUsingAI(true); // Using AI-generated bios
      
      toast({
        title: "Ultra-Unique Business Bios Generated! 💼",
        description: `Created ${finalBios.length} completely unique AI-generated business bios. No repeats guaranteed!`,
      });

      return finalBios;
    } catch (error) {
      console.error('Bio generation failed:', error);
      toast({
        title: "Bio Generation Failed",
        description: "Unable to generate business bios at the moment. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };

  // Generate new bios on component mount (page load/refresh)
  useEffect(() => {
    const initializeBios = async () => {
      setIsLoading(true);
      await generateBusinessBios();
      setIsLoading(false);
    };

    initializeBios();
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to manually regenerate bios
  const handleRegenerateBios = async () => {
    setIsRegenerating(true);
    await generateBusinessBios();
    setIsRegenerating(false);
  };

  // Function to reset bio history and generate fresh bios
  const handleResetAndRegenerate = () => {
    setPreviouslyGeneratedBios(new Set());
    handleRegenerateBios();
  };

  const copyBio = (bio: string) => {
    navigator.clipboard.writeText(bio);
    toast({
      title: "Bio Copied! 💼",
      description: "Your professional bio is ready to impress!"
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30'}`}>
      <Header />
      <BioCategoryNavbar />
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
        </div>

        {/* AI-Generated Business Bios Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isUsingAI ? 'AI-Generated Business Bios' : 'Curated Business Bios'}
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                {isUsingAI ? 'Fresh & Professional' : 'Curated Collection'}
              </Badge>
            </div>
            
            <Button
              onClick={handleRegenerateBios}
              disabled={isRegenerating || isLoading}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-900/20"
            >
              {isRegenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New
                </>
              )}
            </Button>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="shadow-lg border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="h-6 bg-blue-200 dark:bg-blue-700 rounded animate-pulse w-32"></div>
                      <div className="h-6 bg-blue-100 dark:bg-blue-800 rounded animate-pulse w-16"></div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-10 bg-blue-200 dark:bg-blue-700 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {businessBios.map((bio, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        AI Bio #{index + 1}
                      </span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        {isUsingAI ? 'AI-Generated' : 'Curated'}
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
          )}
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI-Powered Business Instagram Bios
              </h2>
              
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🤖 AI-Generated Fresh Content</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Every time you visit or refresh this page, our AI creates brand new business bios tailored specifically 
                        for professional networking and business growth. Get unique, conversion-focused bios every single time!
                      </p>
                    </div>
                  </div>
                </div>

                <p>
                  Professional Instagram bios are crucial for establishing credibility and attracting potential clients or partners. 
                  These AI-generated bios combine business expertise, clear value propositions, and strategic calls-to-action to maximize your professional impact.
                </p>

                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-8 mb-4">
                  Key Elements of Business Bios
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Clear Value Proposition</h4>
                    <p className="text-sm">What you do and how you help clients</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Professional Credentials</h4>
                    <p className="text-sm">Your expertise and achievements</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Contact Information</h4>
                    <p className="text-sm">How potential clients can reach you</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Call to Action</h4>
                    <p className="text-sm">Clear next steps for interested prospects</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-8 mb-4">
                  Tips for Professional Success
                </h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span><strong>Professional Tone:</strong> Maintain credibility while showing personality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                    <span><strong>Results-Focused:</strong> Highlight achievements and measurable outcomes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <span><strong>Clear CTA:</strong> Make it easy for prospects to take the next step</span>
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

export default BusinessBios;
