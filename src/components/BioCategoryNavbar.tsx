import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, Lightbulb, Star, Sparkles, Building2, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

const bioCategories = [
  {
    id: 'aesthetic',
    label: 'Aesthetic',
    path: '/aesthetic-bios',
    icon: Palette,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'funny',
    label: 'Funny',
    path: '/funny-bios',
    icon: Lightbulb,
    gradient: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'business',
    label: 'Business',
    path: '/business-bios',
    icon: Building2,
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'cool',
    label: 'Cool Ideas',
    path: '/cool-instagram-bio-ideas',
    icon: Sparkles,
    gradient: 'from-green-500 to-teal-500'
  },
  {
    id: 'ai-generator',
    label: 'AI Generator',
    path: '/ai-bio-generator',
    icon: Wand2,
    gradient: 'from-cyan-500 to-blue-500'
  }
];

export const BioCategoryNavbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="hidden md:flex justify-center mb-8 px-4">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-2 shadow-lg"
      >
        <div className="flex items-center space-x-1">
          {bioCategories.map((category) => {
            const IconComponent = category.icon;
            const isActive = currentPath === category.path;
            
            return (
              <Link
                key={category.id}
                to={category.path}
                className="relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative flex items-center gap-2 px-4 py-2.5 rounded-xl 
                    transition-all duration-300 text-sm font-medium
                    ${isActive
                      ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="whitespace-nowrap">{category.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-20"
                      style={{
                        background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </div>
  );
};
