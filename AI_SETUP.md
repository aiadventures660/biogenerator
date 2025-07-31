# AI Generation Setup

## Issue: Showing Curated Bios Instead of AI-Generated

If you're seeing "Curated" bios instead of "AI-Generated" bios, this means the AI generation is failing. The most common cause is a missing Gemini API key.

## Solution

1. **Get a Gemini API Key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key

2. **Set the API Key in Supabase:**
   - Go to your Supabase dashboard
   - Navigate to Project Settings > Edge Functions > Environment Variables
   - Add a new variable:
     - Name: `GEMINI_API_KEY`
     - Value: Your Gemini API key

3. **Redeploy the Edge Function:**
   ```bash
   npx supabase functions deploy generate-bio
   ```

## Verification

After setting up the API key:
1. Refresh any bio page (Aesthetic, Funny, Business, Cool)
2. Check the browser console for logs
3. You should see "AI bios generated successfully" and the badge should show "AI-Generated"

## Fallback Behavior

The app is designed to gracefully fall back to curated bios when AI generation fails, ensuring users always have quality content.
