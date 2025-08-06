import React, { useState, useEffect } from 'react';
import { Copy, Laugh, Sparkles, Smile, ArrowLeft, RefreshCw, Loader2, RotateCcw } from 'lucide-react';
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

const FunnyBios = () => {
  const { darkMode } = useDarkMode();
  const { toast } = useToast();
  const [funnyBios, setFunnyBios] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
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
      const closingKeywords = ['dm', 'message', 'connect', 'follow', 'contact', 'reach out', 'fun', 'laughs', 'comedy'];
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

  const generateFunnyBios = async () => {
    try {
      console.log('Attempting to generate AI funny bios...');
      
      // Use much more diverse parameter sets to ensure completely different content
      const parameterSets = [
        {
          interests: 'comedy, humor, entertainment, fun activities, pop culture, memes',
          profession: 'comedian, entertainer, content creator, funny person, joker',
          personality: 'witty, humorous, entertaining, self-deprecating, playful, silly',
          tone: 'Funny',
          style: 'With Emojis',
          bioType: 'funny',
          format: '3-line',
          instructions: 'Create exactly 3 lines for Instagram bio format. Focus on humor and entertainment.'
        },
        {
          interests: 'sarcasm, wit, dark humor, stand-up comedy, funny movies, pranks',
          profession: 'comedian, satirist, humorist, entertainer, meme creator',
          personality: 'sarcastic, witty, clever, amusing, quirky, hilarious',
          tone: 'Sarcastic',
          style: 'Clever Text',
          bioType: 'funny',
          format: '3-line',
          instructions: 'Create exactly 3 lines for Instagram bio format. Emphasize wit and sarcasm.'
        },
        {
          interests: 'food humor, daily life comedy, relatable content, funny observations',
          profession: 'food lover, everyday comedian, relatable content creator',
          personality: 'relatable, funny, down-to-earth, amusing, entertaining',
          tone: 'Relatable',
          style: 'With Emojis',
          bioType: 'funny',
          format: '3-line',
          instructions: 'Create exactly 3 lines for Instagram bio format. Focus on relatable humor.'
        },
        {
          interests: 'animal humor, pet comedy, cute animals, funny pets, zoo life',
          profession: 'animal lover, pet parent, zoo enthusiast, animal comedian',
          personality: 'playful, animal-loving, cute, funny, adorable',
          tone: 'Playful',
          style: 'Animal Themed',
          bioType: 'funny',
          format: '3-line',
          instructions: 'Create exactly 3 lines for Instagram bio format. Include animal-themed humor.'
        },
        {
          interests: 'tech humor, nerd jokes, programming memes, geek culture, sci-fi',
          profession: 'programmer, tech enthusiast, nerd, geek, developer',
          personality: 'nerdy, tech-savvy, geeky, smart, funny',
          tone: 'Nerdy',
          style: 'Tech Humor',
          bioType: 'funny',
          format: '3-line',
          instructions: 'Create exactly 3 lines for Instagram bio format. Focus on tech and nerd humor.'
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
          description: "Unable to generate unique funny bios. Please try again.",
          variant: "destructive",
        });
        return [];
      }
      
      // Update the previously generated bios set
      const newPreviouslyGenerated = new Set(previouslyGeneratedBios);
      finalBios.forEach(bio => newPreviouslyGenerated.add(normalizeBio(bio)));
      setPreviouslyGeneratedBios(newPreviouslyGenerated);
      
      setFunnyBios(finalBios);
      
      toast({
        title: "Ultra-Unique Funny Bios Generated! 😂",
        description: `Created ${finalBios.length} completely unique AI-generated funny bios. No repeats guaranteed!`,
      });

      return finalBios;
    } catch (error) {
      console.error('Bio generation failed:', error);
      toast({
        title: "Bio Generation Failed",
        description: "Unable to generate funny bios at the moment. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };

  // Generate new bios on component mount (page load/refresh)
  useEffect(() => {
    const initializeBios = async () => {
      setIsLoading(true);
      await generateFunnyBios();
      setIsLoading(false);
    };

    initializeBios();
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to manually regenerate bios
  const handleRegenerateBios = async () => {
    setIsRegenerating(true);
    await generateFunnyBios();
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
      title: "Bio Copied! 😂",
      description: "Your funny bio is ready to make people laugh!"
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-yellow-50/30 to-orange-50/30'}`}>
      <Header />
      <BioCategoryNavbar />
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
              description: "Copy and paste these funny bios to bring smiles to your profile."
            </p>
          </div>
        </div>

        {/* AI-Generated Funny Bios Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                AI-Generated Funny Bios
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                Fresh & Hilarious
              </Badge>
              {previouslyGeneratedBios.size > 0 && (
                <Badge variant="outline" className="text-xs text-gray-500 dark:text-gray-400">
                  {previouslyGeneratedBios.size} unique bios generated
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              {previouslyGeneratedBios.size > 0 && (
                <Button
                  onClick={handleResetAndRegenerate}
                  disabled={isRegenerating || isLoading}
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-600 dark:hover:bg-purple-900/20"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset History
                </Button>
              )}
              
              <Button
                onClick={handleRegenerateBios}
                disabled={isRegenerating || isLoading}
                variant="outline"
                size="sm"
                className="text-orange-600 border-orange-200 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-600 dark:hover:bg-orange-900/20"
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
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="shadow-lg border-0 bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="h-6 bg-orange-200 dark:bg-orange-700 rounded animate-pulse w-32"></div>
                      <div className="h-6 bg-orange-100 dark:bg-orange-800 rounded animate-pulse w-16"></div>
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
                    <div className="h-10 bg-orange-200 dark:bg-orange-700 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {funnyBios.map((bio, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                        AI Bio #{index + 1}
                      </span>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                        AI-Generated
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
          )}
        </div>

        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-yellow-50/20 to-orange-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                AI-Powered Funny Instagram Bios
              </h2>
              
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-6 w-6 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">🤖 AI-Generated Fresh Content</h4>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        Every time you visit or refresh this page, our AI creates brand new funny bios tailored specifically 
                        for humor and entertainment. No more repetitive content - get unique, hilarious bios every single time!
                      </p>
                    </div>
                  </div>
                </div>

                <p>
                  Funny Instagram bios are one of the best ways to show your personality and make a memorable first impression. 
                  These AI-generated bios combine humor, wit, and entertainment to create engaging content that makes people want to follow you.
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
