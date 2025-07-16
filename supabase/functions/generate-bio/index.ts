
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { interests, profession, personality, tone, style, bioType } = await req.json();

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      throw new Error('Gemini API key not configured. Please add GEMINI_API_KEY to your Supabase Edge Function secrets.');
    }
    
    console.log('Gemini API key configured:', apiKey.substring(0, 10) + '...');

    // Enhanced prompts based on bio type
    const getBioTypeSpecificPrompt = (type: string) => {
      switch (type) {
        case 'aesthetic':
          return `Create 3 aesthetic Instagram bio variations with these characteristics:
            - Use soft, dreamy language and beautiful imagery
            - Include aesthetic emojis like ✨ 🌙 💫 🦋 🌸 🤍 ☁️
            - Focus on minimalist and artistic vibes
            - Use line breaks for visual appeal
            - Keep each bio under 150 characters
            - Make them feel dreamy and ethereal`;
            
        case 'funny':
          return `Create 3 funny Instagram bio variations with these characteristics:
            - Use humor, wit, and clever wordplay
            - Include fun emojis like 😂 🤪 🙃 🍕 ☕ 🎭 🤡
            - Make them relatable and entertaining
            - Use self-deprecating humor when appropriate
            - Keep each bio under 150 characters
            - Make people smile or laugh`;
            
        case 'business':
          return `Create 3 professional business Instagram bio variations with these characteristics:
            - Use professional, authoritative language
            - Include business-focused emojis like 💼 📈 🚀 🎯 💡 ⭐
            - Focus on value proposition and credibility
            - Include call-to-action elements
            - Keep each bio under 150 characters
            - Make them convert visitors into customers`;
            
        case 'cool':
          return `Create 3 cool and trendy Instagram bio variations with these characteristics:
            - Use confident, inspiring language
            - Include trendy emojis like 🔥 ✨ 💫 ⚡ 🌟 💎 🦋
            - Focus on unique personality and style
            - Make them feel current and engaging
            - Keep each bio under 150 characters
            - Make them stand out from the crowd`;
            
        default:
          return `Create 3 Instagram bio variations`;
      }
    };

    let prompt;
    
    if (bioType) {
      // Use bio type specific prompt for page-based generations
      prompt = getBioTypeSpecificPrompt(bioType);
    } else {
      // Use custom prompt for AI bio generator page
      prompt = `Create 3 Instagram bio variations for someone with these details:
        
Interests: ${interests || 'Not specified'}
Profession: ${profession || 'Not specified'}
Personality: ${personality || 'Not specified'}
Tone: ${tone || 'Casual'}
Style: ${style || 'With Emojis'}

Requirements:
- Keep each bio under 150 characters
- Make them unique and engaging
- ${style && style.includes('Emojis') ? 'Include relevant emojis' : 'Minimal or no emojis'}
- ${style && style.includes('Line Breaks') ? 'Use line breaks for visual appeal' : 'Keep compact'}
- Each bio should feel authentic and personal`;
    }

    prompt += `\n\nReturn only the 3 bios, separated by "---"

Example format:
Bio 1 text here
---
Bio 2 text here  
---
Bio 3 text here`;

    console.log('Sending request to Gemini API with model: gemini-1.5-flash');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', response.status, errorText);
      
      if (response.status === 400) {
        throw new Error('Invalid request to Gemini API. Please check your input parameters.');
      } else if (response.status === 401) {
        throw new Error('Invalid Gemini API key. Please check your GEMINI_API_KEY configuration.');
      } else if (response.status === 403) {
        throw new Error('Gemini API access forbidden. Please verify your API key permissions.');
      } else if (response.status === 429) {
        throw new Error('Gemini API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error('No content generated from Gemini API');
    }

    const bios = generatedText.split('---').map((bio: string) => bio.trim()).filter((bio: string) => bio.length > 0);
    
    console.log('Successfully generated bios:', bios.length, 'for type:', bioType || 'custom');

    return new Response(JSON.stringify({ bios }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-bio function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
