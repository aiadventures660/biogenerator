import React, { useState, useEffect } from 'react';
import { Copy, Palette, Sparkles, Heart, ArrowLeft, RefreshCw, Loader2 } from 'lucide-react';
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

const AestheticBios = () => {
  const { darkMode } = useDarkMode();
  const { toast } = useToast();
  const [aestheticBios, setAestheticBios] = useState<string[]>([]);
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
        
        // Calculate similarity percentage - BALANCED STRICT (30% instead of 20%)
        const commonUniqueWords = bioWords.filter(word => prevBioWords.includes(word));
        const totalUniqueWords = Math.max(bioWords.length, prevBioWords.length);
        const similarity = totalUniqueWords > 0 ? (commonUniqueWords.length / totalUniqueWords) : 0;
        
        // If more than 30% similar, consider it a duplicate (balanced between 20% and 60%)
        if (similarity > 0.3) {
          console.log(`Bio filtered due to high similarity: ${similarity.toFixed(2)} with previous bio`);
          console.log(`Current bio words: ${bioWords.join(', ')}`);
          console.log(`Previous bio words: ${prevBioWords.join(', ')}`);
          console.log(`Common words: ${commonUniqueWords.join(', ')}`);
          return false;
        }
        
        // Check for ANY single word matches with key aesthetic terms (but be more selective)
        const aestheticKeywords = ['sunset', 'sunsets', 'moonbeam', 'moonbeams', 'dreams', 'dreaming', 'clouds', 'artist', 'art', 'aesthetic', 'vibes', 'chasing', 'lost', 'world', 'heart'];
        const bioAestheticWords = bioWords.filter(word => aestheticKeywords.includes(word));
        const prevBioAestheticWords = prevBioWords.filter(word => aestheticKeywords.includes(word));
        
        // Only filter if they share 3 or more key aesthetic words (more lenient)
        const sharedAestheticWords = bioAestheticWords.filter(word => prevBioAestheticWords.includes(word));
        if (sharedAestheticWords.length >= 3) {
          console.log(`Bio filtered due to shared aesthetic keywords: ${sharedAestheticWords.join(', ')}`);
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
            // Check if sentences are too similar (edit distance) - MORE STRICT
            const editDistance = calculateEditDistance(bioSentence, prevSentence);
            const maxLength = Math.max(bioSentence.length, prevSentence.length);
            const sentenceSimilarity = maxLength > 0 ? 1 - (editDistance / maxLength) : 0;
            
            if (sentenceSimilarity > 0.6) { // More strict: 0.6 instead of 0.7
              console.log(`Bio filtered due to similar sentence structure: ${sentenceSimilarity.toFixed(2)}`);
              console.log(`Bio sentence: "${bioSentence}"`);
              console.log(`Previous sentence: "${prevSentence}"`);
              return false;
            }
          }
        }
        
        // NEW: Check for emoji pattern similarity
        const bioEmojis: string[] = bio.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || [];
        const prevBioEmojis: string[] = prevBio.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || [];
        
        if (bioEmojis.length > 0 && prevBioEmojis.length > 0) {
          const commonEmojis = bioEmojis.filter((emoji: string) => prevBioEmojis.includes(emoji));
          const emojiSimilarity = commonEmojis.length / Math.max(bioEmojis.length, prevBioEmojis.length);
          
          if (emojiSimilarity > 0.5) { // If more than 50% of emojis are the same
            console.log(`Bio filtered due to similar emoji patterns: ${emojiSimilarity.toFixed(2)}`);
            console.log(`Common emojis: ${commonEmojis.join(', ')}`);
            return false;
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
      const closingKeywords = ['dm', 'message', 'connect', 'follow', 'contact', 'reach out', 'aesthetic', 'vibes', 'dreams'];
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

  const generateAestheticBios = async () => {
    try {
      console.log('Attempting to generate AI bios...');
      const { data, error } = await supabase.functions.invoke('generate-bio', {
        body: {
          interests: 'aesthetic lifestyle, minimalism, self-care, artistic expression',
          profession: 'content creator, influencer, lifestyle enthusiast',
          personality: 'dreamy, artistic, minimalist vibes with soft colors and beautiful imagery',
          tone: 'Aesthetic',
          style: 'With Emojis',
          bioType: 'aesthetic',
          format: '3-line',
          instructions: 'Create exactly 3 lines for Instagram bio format. Focus on aesthetic and dreamy vibes.'
        }
      });

      console.log('Supabase response:', { data, error });

      // Check if there's an actual error or invalid response
      if (error) {
        console.error('Supabase function error:', error);
        toast({
          title: "Bio Generation Failed",
          description: "Unable to generate aesthetic bios at the moment. Please try again.",
          variant: "destructive",
        });
        return [];
      }

      if (!data?.bios || !Array.isArray(data.bios) || data.bios.length === 0) {
        console.warn('Invalid or empty bios response:', data);
        toast({
          title: "Bio Generation Failed",
          description: "No aesthetic bios were generated. Please try again.",
          variant: "destructive",
        });
        return [];
      }

      // AI generation successful!
      console.log('AI bios generated successfully:', data.bios);
      setIsUsingAI(true); // Using AI-generated bios
      const allBios = [...data.bios];
      
      // Generate multiple batches with different parameters to ensure uniqueness
      const parameterSets = [
        {
          interests: 'aesthetic lifestyle, photography, mindfulness, creativity',
          profession: 'digital creator, artist, lifestyle blogger',
          personality: 'ethereal, peaceful, inspiring with dreamy aesthetic vibes',
          tone: 'Aesthetic',
          style: 'With Emojis',
          bioType: 'aesthetic',
          format: '3-line',
          instructions: 'Create exactly 3 lines for Instagram bio format. Emphasize ethereal and peaceful aesthetic vibes with unique content.'
        },
        {
          interests: 'minimalist living, nature, wellness, creative arts',
          profession: 'creative soul, wellness advocate, nature lover',
          personality: 'serene, mindful, artistic with natural beauty aesthetic',
          tone: 'Aesthetic',
          style: 'With Emojis',
          bioType: 'aesthetic',
          format: '3-line',
          instructions: 'Create exactly 3 lines focusing on minimalist and nature-inspired aesthetic vibes.'
        },
        {
          interests: 'sunset photography, poetry, coffee culture, vintage style',
          profession: 'photographer, poet, vintage enthusiast',
          personality: 'romantic, nostalgic, artistic with vintage aesthetic charm',
          tone: 'Aesthetic',
          style: 'With Emojis',
          bioType: 'aesthetic',
          format: '3-line',
          instructions: 'Create exactly 3 lines with romantic and vintage aesthetic themes.'
        },
        {
          interests: 'pastel colors, soft aesthetics, self-care, journaling',
          profession: 'wellness blogger, aesthetic curator, mindfulness coach',
          personality: 'gentle, inspiring, dreamy with soft pastel vibes',
          tone: 'Aesthetic',
          style: 'With Emojis',
          bioType: 'aesthetic',
          format: '3-line',
          instructions: 'Create exactly 3 lines emphasizing soft, pastel, and gentle aesthetic themes.'
        },
        {
          interests: 'golden hour, modern art, meditation, sustainable living',
          profession: 'artist, sustainability advocate, mindful creator',
          personality: 'conscious, artistic, inspiring with golden aesthetic energy',
          tone: 'Aesthetic',
          style: 'With Emojis',
          bioType: 'aesthetic',
          format: '3-line',
          instructions: 'Create exactly 3 lines focusing on golden hour and sustainable aesthetic lifestyle.'
        }
      ];

      // Generate additional bios with different parameter sets if needed
      for (let i = 1; i < parameterSets.length && allBios.length < 15; i++) {
        try {
          const { data: additionalData, error: additionalError } = await supabase.functions.invoke('generate-bio', {
            body: parameterSets[i]
          });

          if (!additionalError && additionalData?.bios && Array.isArray(additionalData.bios)) {
            allBios.push(...additionalData.bios);
            console.log(`Generated ${additionalData.bios.length} additional bios with parameter set ${i + 1}`);
          }
        } catch (error) {
          console.log(`Failed to generate with parameter set ${i + 1}, continuing...`);
        }
      }

      console.log(`Total bios before filtering: ${allBios.length}`);

      // Apply ultra-strict duplicate prevention and format to 3 lines
      const formattedBios = allBios.map(bio => formatTo3Lines(bio)).filter(bio => bio.length > 0);
      const currentBioSet = new Set(previouslyGeneratedBios);
      
      // Add current aesthetic bios to the set to avoid immediate duplicates
      aestheticBios.forEach(bio => {
        currentBioSet.add(normalizeBio(bio));
      });

      // ENHANCED: Remove duplicates within the same batch first
      const withinBatchUnique: string[] = [];
      const batchBioSet = new Set<string>();
      
      for (const bio of formattedBios) {
        const normalizedBio = normalizeBio(bio);
        
        // Check exact match within this batch
        if (batchBioSet.has(normalizedBio)) {
          console.log(`Within-batch duplicate filtered: "${bio}"`);
          continue;
        }
        
        // Check similarity with other bios in this batch (LESS STRICT for within-batch)
        let isDuplicateInBatch = false;
        for (const existingBio of withinBatchUnique) {
          const existingNormalized = normalizeBio(existingBio);
          
          // Quick similarity check - but more lenient for within-batch (50% instead of 30%)
          const bioWords = normalizedBio.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 2);
          const existingWords = existingNormalized.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 2);
          
          const commonWords = bioWords.filter(word => existingWords.includes(word));
          const similarity = commonWords.length / Math.max(bioWords.length, existingWords.length);
          
          if (similarity > 0.6) { // More lenient: 60% similarity within same batch (was 30%)
            console.log(`Within-batch similarity duplicate filtered: "${bio}" (${(similarity * 100).toFixed(1)}% similar to "${existingBio}")`);
            console.log(`Common words: ${commonWords.join(', ')}`);
            isDuplicateInBatch = true;
            break;
          }
          
          // Check for exact phrase matches (but only longer phrases)
          const bioText = bio.toLowerCase().replace(/[^\w\s]/g, ' ').trim();
          const existingText = existingBio.toLowerCase().replace(/[^\w\s]/g, ' ').trim();
          
          // Only check for 4+ word chunks instead of 3-word chunks
          const bioChunks = [];
          const existingChunks = [];
          const bioWordsArray = bioText.split(/\s+/).filter(w => w.length > 2);
          const existingWordsArray = existingText.split(/\s+/).filter(w => w.length > 2);
          
          for (let i = 0; i <= bioWordsArray.length - 4; i++) {
            bioChunks.push(bioWordsArray.slice(i, i + 4).join(' '));
          }
          
          for (let i = 0; i <= existingWordsArray.length - 4; i++) {
            existingChunks.push(existingWordsArray.slice(i, i + 4).join(' '));
          }
          
          const commonChunks = bioChunks.filter(chunk => existingChunks.includes(chunk));
          if (commonChunks.length > 0) {
            console.log(`Within-batch phrase duplicate filtered: "${bio}" (shares 4+ word phrases: ${commonChunks.join(', ')} with "${existingBio}")`);
            isDuplicateInBatch = true;
            break;
          }
        }
        
        if (!isDuplicateInBatch) {
          withinBatchUnique.push(bio);
          batchBioSet.add(normalizedBio);
        }
      }
      
      console.log(`After within-batch filtering: ${withinBatchUnique.length} bios from original ${formattedBios.length}`);

      const uniqueBios = getUniqueBios(withinBatchUnique, currentBioSet);
      
      console.log(`Unique bios after ultra-strict filtering: ${uniqueBios.length}`);

      // SAFETY MECHANISM: If we have too few bios after filtering, take the first batch as-is
      let finalBiosForProcessing = uniqueBios;
      if (uniqueBios.length < 3) {
        console.log(`⚠️ Too few bios after filtering (${uniqueBios.length}). Using first ${Math.min(6, withinBatchUnique.length)} bios from within-batch unique set.`);
        finalBiosForProcessing = withinBatchUnique.slice(0, 6);
      }

      // Update the previously generated bios set
      const newPreviouslyGenerated = new Set(previouslyGeneratedBios);
      finalBiosForProcessing.slice(0, 6).forEach(bio => {
        newPreviouslyGenerated.add(normalizeBio(bio));
      });
      setPreviouslyGeneratedBios(newPreviouslyGenerated);

      // Take up to 6 unique bios with final deduplication
      const finalBios = finalBiosForProcessing.slice(0, 6);
      
      // FINAL SAFETY CHECK: Remove any remaining duplicates in the final set
      const absolutelyFinalBios: string[] = [];
      const finalBioSet = new Set<string>();
      
      for (const bio of finalBios) {
        const normalizedBio = normalizeBio(bio);
        if (!finalBioSet.has(normalizedBio)) {
          // Also check against already added bios for similarity
          let isDuplicate = false;
          for (const addedBio of absolutelyFinalBios) {
            const bioText = bio.toLowerCase().replace(/[^\w\s]/g, ' ');
            const addedText = addedBio.toLowerCase().replace(/[^\w\s]/g, ' ');
            
            if (bioText === addedText || bioText.includes(addedText) || addedText.includes(bioText)) {
              console.log(`Final safety check: Filtered duplicate "${bio}" (too similar to "${addedBio}")`);
              isDuplicate = true;
              break;
            }
          }
          
          if (!isDuplicate) {
            absolutelyFinalBios.push(bio);
            finalBioSet.add(normalizedBio);
          }
        } else {
          console.log(`Final safety check: Filtered exact duplicate "${bio}"`);
        }
      }
      
      console.log(`Final bios count after all deduplication: ${absolutelyFinalBios.length}`);
      setAestheticBios(absolutelyFinalBios);
      
      toast({
        title: "Fresh Aesthetic Bios Generated! ✨",
        description: `Created ${absolutelyFinalBios.length} new unique AI-generated aesthetic bios for you.`,
      });

      return absolutelyFinalBios;
    } catch (error) {
      console.error('Exception during AI generation:', error);
      toast({
        title: "Bio Generation Failed",
        description: "An error occurred while generating aesthetic bios. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };

  // Generate new bios on component mount (page load/refresh)
  useEffect(() => {
    const initializeBios = async () => {
      setIsLoading(true);
      await generateAestheticBios();
      setIsLoading(false);
    };

    initializeBios();
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to manually regenerate bios
  const handleRegenerateBios = async () => {
    setIsRegenerating(true);
    await generateAestheticBios();
    setIsRegenerating(false);
  };

  const copyBio = (bio: string) => {
    navigator.clipboard.writeText(bio);
    toast({
      title: "Bio Copied! ✨",
      description: "Your aesthetic bio is ready to paste on Instagram!"
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30'}`}>
      <Header />
      <BioCategoryNavbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Generator
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Aesthetic Instagram Bios
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the most beautiful aesthetic Instagram bios that will make your profile stand out. 
              Copy and paste these carefully crafted aesthetic bios to express your unique style.
            </p>
          </div>
        </div>

        {/* AI-Generated Aesthetic Bios Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isUsingAI ? 'AI-Generated Aesthetic Bios' : 'Curated Aesthetic Bios'}
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                {isUsingAI ? 'Fresh & Unique' : 'Curated Collection'}
              </Badge>
            </div>
            
            <Button
              onClick={handleRegenerateBios}
              disabled={isRegenerating || isLoading}
              variant="outline"
              size="sm"
              className="text-purple-600 border-purple-200 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-600 dark:hover:bg-purple-900/20"
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
                <Card key={index} className="shadow-lg border-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="h-6 bg-purple-200 dark:bg-purple-700 rounded animate-pulse w-32"></div>
                      <div className="h-6 bg-purple-100 dark:bg-purple-800 rounded animate-pulse w-16"></div>
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
                    <div className="h-10 bg-purple-200 dark:bg-purple-700 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {aestheticBios.map((bio, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                        AI Bio #{index + 1}
                      </span>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
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
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI-Powered Aesthetic Instagram Bios
              </h2>
              
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                        {isUsingAI ? '🤖 AI-Generated Fresh Content' : '✨ Curated Collection'}
                      </h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        {isUsingAI 
                          ? 'Every time you visit or refresh this page, our AI creates brand new aesthetic bios tailored specifically for the aesthetic lifestyle. No more repetitive content - get unique, creative bios every single time!'
                          : 'Our carefully curated collection of aesthetic bios, handpicked by our team for their beauty and style. These premium bios are perfect for creating an aesthetic Instagram profile.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <p>
                  Aesthetic Instagram bios are all about creating a visual harmony that reflects your personality and style. 
                  These AI-generated bios combine beautiful emojis, meaningful words, and artistic formatting to create a cohesive look 
                  that matches your Instagram feed's aesthetic.
                </p>

                <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mt-8 mb-4">
                  Key Elements of Aesthetic Bios
                </h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <span><strong>Emoji Consistency:</strong> Use emojis that match your overall aesthetic theme</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                    <span><strong>Color Coordination:</strong> Choose emojis and symbols in complementary colors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Palette className="h-5 w-5 text-indigo-500 mt-1 flex-shrink-0" />
                    <span><strong>Visual Balance:</strong> Create symmetry and visual flow in your bio layout</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mt-8 mb-4">
                  Popular Aesthetic Bio Themes
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Soft Aesthetic</h4>
                    <p className="text-sm">Pastel colors, dreamy vibes, and gentle imagery</p>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-pink-700 dark:text-pink-300 mb-2">Minimalist</h4>
                    <p className="text-sm">Clean lines, simple emojis, and elegant spacing</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Dark Academia</h4>
                    <p className="text-sm">Scholarly vibes with book and coffee emojis</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Nature Lover</h4>
                    <p className="text-sm">Plant emojis, earth tones, and natural imagery</p>
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

export default AestheticBios;
