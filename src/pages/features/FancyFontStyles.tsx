import React, { useState } from 'react';
import { Type, Copy, ArrowLeft, Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import Footer from "@/components/ui/footer";
import { useToast } from "@/hooks/use-toast";

const FancyFontStyles = () => {
  const [inputText, setInputText] = useState('Your text here');
  const { toast } = useToast();

  const fontStyles = [
    { name: 'Bold', text: '𝐘𝐨𝐮𝐫 𝐭𝐞𝐱𝐭 𝐡𝐞𝐫𝐞', category: 'Bold' },
    { name: 'Italic', text: '𝑌𝑜𝓊𝓇 𝓉𝑒𝓍𝓉 𝒽𝑒𝓇𝑒', category: 'Italic' },
    { name: 'Bold Italic', text: '𝒀𝒐𝒖𝒓 𝒕𝒆𝒙𝒕 𝒉𝒆𝒓𝒆', category: 'Bold' },
    { name: 'Monospace', text: '𝚈𝚘𝚞𝚛 𝚝𝚎𝚡𝚝 𝚑𝚎𝚛𝚎', category: 'Monospace' },
    { name: 'Double Struck', text: '𝕐𝕠𝕦𝕣 𝕥𝕖𝕩𝕥 𝕙𝕖𝕣𝕖', category: 'Special' },
    { name: 'Script', text: '𝒴ℴ𝓊𝓇 𝓉ℯ𝓍𝓉 𝒽ℯ𝓇ℯ', category: 'Script' },
    { name: 'Fraktur', text: '𝔜𝔬𝔲𝔯 𝔱𝔢𝔵𝔱 𝔥𝔢𝔯𝔢', category: 'Gothic' },
    { name: 'Sans-serif Bold', text: '𝗬𝗼𝘂𝗿 𝘁𝗲𝘅𝘁 𝗵𝗲𝗿𝗲', category: 'Sans-serif' },
    { name: 'Sans-serif Italic', text: '𝘠𝘰𝘶𝘳 𝘵𝘦𝘹𝘵 𝘩𝘦𝘳𝘦', category: 'Sans-serif' },
    { name: 'Small Caps', text: 'ʏᴏᴜʀ ᴛᴇxᴛ ʜᴇʀᴇ', category: 'Special' },
    { name: 'Upside Down', text: 'ǝɹǝɥ ʇxǝʇ ɹno⅄', category: 'Fun' },
    { name: 'Bubble Text', text: 'Ⓨⓞⓤⓡ ⓣⓔⓧⓣ ⓗⓔⓡⓔ', category: 'Fun' },
    { name: 'Square Text', text: '🅈🄾🅄🅁 🅃🄴🅇🅃 🄷🄴🅁🄴', category: 'Fun' },
    { name: 'Negative Square', text: '🆈🅾🆄🆁 🆃🅴🆇🆃 🅷🅴🆁🅴', category: 'Fun' },
    { name: 'Strikethrough', text: 'Y̶o̶u̶r̶ ̶t̶e̶x̶t̶ ̶h̶e̶r̶e̶', category: 'Special' },
    { name: 'Underline', text: 'Y̲o̲u̲r̲ ̲t̲e̲x̲t̲ ̲h̲e̲r̲e̲', category: 'Special' },
    { name: 'Superscript', text: 'ʸᵒᵘʳ ᵗᵉˣᵗ ʰᵉʳᵉ', category: 'Special' },
    { name: 'Subscript', text: 'yₒᵤᵣ ₜₑₓₜ ₕₑᵣₑ', category: 'Special' },
    { name: 'Wide Text', text: 'Ｙｏｕｒ ｔｅｘｔ ｈｅｒｅ', category: 'Wide' },
    { name: 'Aesthetic', text: 'ʸᵒᵘʳ ᵗᵉˣᵗ ʰᵉʳᵉ ✨', category: 'Aesthetic' }
  ];

  const categories = ['All', 'Bold', 'Italic', 'Script', 'Sans-serif', 'Monospace', 'Gothic', 'Special', 'Fun', 'Wide', 'Aesthetic'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFonts = selectedCategory === 'All' 
    ? fontStyles 
    : fontStyles.filter(font => font.category === selectedCategory);

  const copyText = async (text: string, fontName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: `${fontName} Copied! ✨`,
        description: "Font style copied to clipboard!"
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try copying manually.",
        variant: "destructive"
      });
    }
  };

  const convertText = (originalText: string, targetStyle: string): string => {
    // This is a simplified conversion - in a real app, you'd have proper Unicode mapping
    return targetStyle.replace(/Your text here/gi, originalText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
              <Type className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Fancy Font Styles
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transform your text with beautiful Unicode fonts. Copy and paste these stylish fonts anywhere - 
            Instagram, Twitter, Facebook, and more!
          </p>
        </div>

        {/* Text Input */}
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-blue-600" />
              Enter Your Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your text here..."
              className="text-lg p-4"
              maxLength={50}
            />
            <p className="text-sm text-gray-500 mt-2">
              {inputText.length}/50 characters
            </p>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Font Styles Grid */}
        <div className="grid gap-4 mb-12">
          {filteredFonts.map((font, index) => (
            <Card key={index} className="shadow-sm border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-sm">{font.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {font.category}
                      </Badge>
                    </div>
                    <div className="text-lg md:text-xl font-mono bg-gray-50 dark:bg-gray-700/50 p-3 rounded border break-all">
                      {convertText(inputText, font.text)}
                    </div>
                  </div>
                  <Button
                    onClick={() => copyText(convertText(inputText, font.text), font.name)}
                    size="sm"
                    variant="ghost"
                    className="ml-4 shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">✨ How to Use</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Type your text in the input field</li>
                  <li>• Browse through different font styles</li>
                  <li>• Click copy button to copy styled text</li>
                  <li>• Paste anywhere you want!</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Best Practices</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Use sparingly for maximum impact</li>
                  <li>• Test readability on different devices</li>
                  <li>• Mix with regular text for balance</li>
                  <li>• Consider your audience and platform</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default FancyFontStyles;
