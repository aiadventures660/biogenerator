
import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Lightbulb, Star, Wand2, Sparkles, ExternalLink } from 'lucide-react';

const quickLinks = [
  {
    title: "Aesthetic Bios",
    description: "Beautiful, dreamy Instagram bios",
    path: "/aesthetic-bios",
    icon: Palette,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Funny Bios",
    description: "Hilarious bios that make people laugh",
    path: "/funny-bios",
    icon: Lightbulb,
    gradient: "from-orange-500 to-yellow-500"
  },
  {
    title: "Business Bios",
    description: "Professional bios for businesses",
    path: "/business-bios",
    icon: Star,
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    title: "AI Bio Generator",
    description: "Advanced AI-powered bio creation",
    path: "/ai-bio-generator",
    icon: Wand2,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    title: "Cool Bio Ideas",
    description: "Trending and creative bio concepts",
    path: "/cool-instagram-bio-ideas",
    icon: Sparkles,
    gradient: "from-green-500 to-teal-500"
  }
];

export const QuickLinksSection: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Explore Bio Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {quickLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="text-center">
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${link.gradient} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <link.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">
                {link.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                {link.description}
              </p>
              <ExternalLink className="h-3 w-3 text-gray-400 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
