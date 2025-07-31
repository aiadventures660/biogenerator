import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";
import { useDarkMode } from "@/contexts/DarkModeContext";
import emailjs from 'emailjs-com';

const SERVICE_ID = 'service_wjxfaub';
const TEMPLATE_ID = 'template_zdlu49z';
const PUBLIC_KEY = 'gsYdyqM9MNy1AzcZ7';

const SuggestFeature: React.FC = () => {
  const { darkMode } = useDarkMode();
  const [suggestion, setSuggestion] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      { suggestion },
      PUBLIC_KEY
    ).then(
      () => {
        setSubmitted(true);
        setSuggestion('');
      },
      (error) => {
        alert('Failed to send suggestion. Please try again.');
        console.error(error);
      }
    );
  };
  return (
    <div className={`min-h-screen flex flex-col transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30'}`}>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">Suggest a Feature</h1>
        <Card className="w-full max-w-lg border-blue-200 dark:border-blue-600">
          <CardHeader>
            <CardTitle className="text-blue-600 dark:text-blue-300 text-lg">Suggest a Feature</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-green-600 dark:text-green-400 font-medium">Thank you for your suggestion! 🚀</div>
            ) : (
              <form onSubmit={handleSuggestionSubmit} className="space-y-3">
                <Textarea
                  value={suggestion}
                  onChange={e => setSuggestion(e.target.value)}
                  placeholder="What feature would you like to see?"
                  className="min-h-20"
                  required
                />
                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 w-full">Submit Suggestion</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SuggestFeature; 