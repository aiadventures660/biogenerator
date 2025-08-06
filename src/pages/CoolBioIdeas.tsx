
import React, { useState, useEffect } from 'react';
import { Copy, Star, Zap, RefreshCw, Loader2, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CoolBioHeader } from "@/components/cool-bio/CoolBioHeader";
import { BioCategoriesGrid } from "@/components/cool-bio/BioCategoriesGrid";
import { PopularSearchTerms } from "@/components/cool-bio/PopularSearchTerms";
import { CoolBioGuide } from "@/components/cool-bio/CoolBioGuide";
import { Header } from "@/components/Header";
import { BioCategoryNavbar } from "@/components/BioCategoryNavbar";
import Footer from "@/components/ui/footer";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { supabase } from "@/integrations/supabase/client";

const CoolBioIdeas = () => {
  const { darkMode } = useDarkMode();
  const { toast } = useToast();
  const [coolBios, setCoolBios] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [previouslyGeneratedBios, setPreviouslyGeneratedBios] = useState<Set<string>>(new Set());

  // Helper function to normalize bio text for storage and comparison
  const normalizeBio = (bio: string): string => {
    return bio.trim().toLowerCase().replace(/\s+/g, ' ');
  };

  // Helper function to ensure bio has exactly 3 lines
  const formatTo3Lines = (bio: string): string => {
    // Remove extra whitespace and split into lines
    const lines = bio.trim().split(/\n+/).filter(line => line.trim().length > 0);
    
    if (lines.length === 3) {
      return lines.join('\n');
    } else if (lines.length > 3) {
      // Take first 3 lines if more than 3
      return lines.slice(0, 3).join('\n');
    } else if (lines.length === 2) {
      // If only 2 lines, return them as is (don't add template content)
      return lines.join('\n');
    } else if (lines.length === 1) {
      // Split single line or return as is
      const singleLine = lines[0];
      if (singleLine.length > 60) {
        // Try to split long line into 3 parts
        const words = singleLine.split(' ');
        const third = Math.ceil(words.length / 3);
        const line1 = words.slice(0, third).join(' ');
        const line2 = words.slice(third, third * 2).join(' ');
        const line3 = words.slice(third * 2).join(' ');
        return [line1, line2, line3].filter(l => l.trim()).join('\n');
      } else {
        // Return single line as is (don't add template content)
        return singleLine;
      }
    } else {
      // Empty or invalid bio - return empty string instead of template
      return '';
    }
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

  const generateCoolBios = async () => {
    try {
      console.log('Attempting to generate AI cool bios...');
      
      // Use much more diverse parameter sets to ensure completely different content
      const parameterSets = [
        {
          interests: 'creativity, self-expression, lifestyle, adventures, dreams, positivity',
          profession: 'creative, artist, influencer, student, free spirit, entrepreneur',
          personality: 'trendy, unique, expressive, confident, inspiring, cool',
          tone: 'Trendy',
          style: 'Emoji Rich',
          bioType: 'cool',
          format: '3-line',
          instructions: 'Generate exactly 3-line Instagram bios. Each line should be concise and impactful. Use line breaks (\\n) to separate the lines.'
        },
        {
          interests: 'fashion, music, travel, photography, art, self-love, wellness',
          profession: 'content creator, designer, blogger, photographer, artist, model',
          personality: 'stylish, authentic, adventurous, passionate, creative, vibrant, bold',
          tone: 'Confident',
          style: 'Minimalist',
          bioType: 'cool',
          format: '3-line',
          instructions: 'Generate exactly 3-line Instagram bios. Each line should be concise and impactful. Use line breaks (\\n) to separate the lines.'
        },
        {
          interests: 'technology, innovation, success, motivation, creativity, future, growth',
          profession: 'entrepreneur, creator, dreamer, achiever, visionary, leader, innovator',
          personality: 'ambitious, confident, unique, inspiring, authentic, bold, determined',
          tone: 'Motivational',
          style: 'Professional',
          bioType: 'cool',
          format: '3-line',
          instructions: 'Generate exactly 3-line Instagram bios. Each line should be concise and impactful. Use line breaks (\\n) to separate the lines.'
        },
        {
          interests: 'nature, mindfulness, spirituality, balance, peace, love, harmony',
          profession: 'healer, teacher, guide, coach, therapist, wellness expert, spiritual guide',
          personality: 'calm, wise, peaceful, loving, intuitive, grounded, mindful',
          tone: 'Inspirational',
          style: 'Mystical',
          bioType: 'cool',
          format: '3-line',
          instructions: 'Generate exactly 3-line Instagram bios. Each line should be concise and impactful. Use line breaks (\\n) to separate the lines.'
        },
        {
          interests: 'fitness, health, sports, energy, strength, discipline, achievement',
          profession: 'athlete, trainer, coach, fitness enthusiast, sports lover, competitor',
          personality: 'strong, determined, energetic, focused, disciplined, powerful, driven',
          tone: 'Energetic',
          style: 'Action-oriented',
          bioType: 'cool',
          format: '3-line',
          instructions: 'Generate exactly 3-line Instagram bios. Each line should be concise and impactful. Use line breaks (\\n) to separate the lines.'
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

      // If we still don't have enough unique bios, supplement with fallback bios that haven't been used
      // Take up to 6 unique bios and ensure they're all exactly 3 lines
      const finalBios = uniqueNewBios.slice(0, 6).map(bio => formatTo3Lines(bio));
      
      if (finalBios.length === 0) {
        toast({
          title: "Bio Generation Failed",
          description: "Unable to generate unique bios. Please try again.",
          variant: "destructive",
        });
        return [];
      }
      
      // Update the previously generated bios set
      const newPreviouslyGenerated = new Set(previouslyGeneratedBios);
      finalBios.forEach(bio => newPreviouslyGenerated.add(normalizeBio(bio)));
      setPreviouslyGeneratedBios(newPreviouslyGenerated);
      
      setCoolBios(finalBios);
      
      toast({
        title: "Ultra-Unique 3-Line Cool Bios Generated! ✨",
        description: `Created ${finalBios.length} completely unique 3-line AI-generated cool bios. No repeats guaranteed!`,
      });

      return finalBios;
    } catch (error) {
      console.error('Bio generation failed:', error);
      toast({
        title: "Bio Generation Failed",
        description: "Unable to generate cool bios at the moment. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };

  // Generate new bios on component mount (page load/refresh)
  useEffect(() => {
    const initializeBios = async () => {
      setIsLoading(true);
      await generateCoolBios();
      setIsLoading(false);
    };

    initializeBios();
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to manually regenerate bios
  const handleRegenerateBios = async () => {
    setIsRegenerating(true);
    await generateCoolBios();
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
      title: "Bio Copied! ✨",
      description: "Your cool bio is ready to make you stand out!"
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30'}`}>
      <Header />
      <BioCategoryNavbar />
      <div className="container mx-auto px-3 lg:px-4 py-6 lg:py-8 max-w-6xl">
        <CoolBioHeader />

        {/* AI-Generated Cool Bios Grid */}
        <div className="mb-8 px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                AI-Generated Cool Bio Ideas
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                Fresh & Trendy
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
                <Card key={index} className="shadow-lg border-0 bg-gradient-to-br from-white via-orange-50/30 to-red-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
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
              {coolBios.map((bio, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white via-orange-50/30 to-red-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
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
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
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

        <BioCategoriesGrid />

        <div className="px-4">
          <PopularSearchTerms />

          <CoolBioGuide />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoolBioIdeas;
