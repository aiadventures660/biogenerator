
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Camera, Palette, Coffee, Gamepad2, BookOpen, RefreshCw, Loader2 } from 'lucide-react';

interface TemplateSelectorProps {
  onSelectTemplate: (template: string) => void;
}

const baseTemplates = [
  {
    icon: Camera,
    category: "Influencer",
    templates: [
      `✨ Content Creator & Dreamer\n📸 Capturing life's beautiful moments\n💌 Collab: youremail@gmail.com`,
      `📱 Digital Storyteller\n🌟 Creating magic one post at a time\n📩 Partnerships: dm me`,
      `🎬 Visual Artist & Creator\n🔥 Turning moments into memories\n💫 Brand collabs welcome`
    ],
    badge: "Popular"
  },
  {
    icon: Briefcase,
    category: "Business",
    templates: [
      `🏢 CEO & Entrepreneur\n💼 Building the future, one step at a time\n🌐 www.yourwebsite.com`,
      `💡 Innovation Leader\n🚀 Transforming ideas into reality\n📧 hello@yourcompany.com`,
      `👔 Business Strategist\n📈 Growth mindset | Results driven\n🔗 Link in bio`
    ],
    badge: "Professional"
  },
  {
    icon: Palette,
    category: "Artist",
    templates: [
      `🎨 Digital Artist & Creative\n✨ Turning imagination into reality\n🖼️ Commissions: Open`,
      `🖌️ Creative Soul & Designer\n🌈 Painting the world with colors\n💝 Custom art available`,
      `✍️ Illustrator & Dreamer\n🎭 Art is my language\n📝 Commission info in bio`
    ],
    badge: "Creative"
  },
  {
    icon: Coffee,
    category: "Lifestyle",
    templates: [
      `☕ Coffee lover & Life enthusiast\n🌸 Living my best life daily\n📍 Currently in: Your City`,
      `🌻 Sunshine seeker & Wanderer\n💕 Finding joy in simple moments\n🏡 Home is where the heart is`,
      `🧘‍♀️ Mindful living advocate\n🌱 Growing and glowing daily\n✨ Positive vibes only`
    ],
    badge: "Cozy"
  },
  {
    icon: Gamepad2,
    category: "Gamer",
    templates: [
      `🎮 Pro Gamer & Streamer\n🏆 Leveling up every day\n📺 Twitch: YourUsername`,
      `🕹️ Gaming enthusiast & Creator\n⚡ Live streaming adventures\n🎯 Join the squad!`,
      `🎪 Esports player & Content maker\n🔥 Gaming is life\n👾 Follow for epic gameplay`
    ],
    badge: "Gaming"
  },
  {
    icon: BookOpen,
    category: "Minimal",
    templates: [
      `less is more\nsimple thoughts\nquiet moments`,
      `breathe\ncreate\nrepeat`,
      `finding beauty\nin ordinary things\neveryday magic`
    ],
    badge: "Clean"
  }
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const [templates, setTemplates] = useState(() => 
    baseTemplates.map(template => ({ ...template, template: template.templates[0] }))
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewTemplates = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newTemplates = baseTemplates.map(baseTemplate => {
      const randomIndex = Math.floor(Math.random() * baseTemplate.templates.length);
      return {
        ...baseTemplate,
        template: baseTemplate.templates[randomIndex]
      };
    });
    
    setTemplates(newTemplates);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
            {templates.length} Templates
          </Badge>
        </div>
        <Button
          onClick={generateNewTemplates}
          disabled={isGenerating}
          variant="outline"
          size="sm"
          className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-gray-700 border-indigo-200 dark:border-indigo-600"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              New Templates
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {templates.map((template, index) => {
          const IconComponent = template.icon;
          return (
            <Button
              key={`${template.category}-${index}`}
              variant="outline"
              onClick={() => onSelectTemplate(template.template)}
              className="h-auto p-4 flex flex-col items-start text-left hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-200 group border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 group-hover:from-indigo-600 group-hover:to-blue-600 transition-all duration-200">
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">{template.category}</span>
                </div>
                <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  {template.badge}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-line group-hover:text-gray-800 dark:group-hover:text-gray-200 leading-relaxed">
                {template.template}
              </p>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
