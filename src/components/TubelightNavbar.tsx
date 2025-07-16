import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href?: string;
  onClick?: () => void;
}

interface TubelightNavbarProps {
  items: NavItem[];
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

export const TubelightNavbar: React.FC<TubelightNavbarProps> = ({
  items,
  activeItem,
  onItemClick
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = (item: NavItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onItemClick) {
      onItemClick(item.id);
    }
    if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <div className="hidden md:flex justify-center mb-8 px-4">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-2 shadow-2xl"
      >
        <div className="flex items-center space-x-2">
          {items.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            const isHovered = hoveredItem === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium text-sm ${
                  isActive
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background glow for active/hovered items */}
                {(isActive || isHovered) && (
                  <motion.div
                    layoutId="navbar-glow"
                    className={`absolute inset-0 rounded-xl ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                        : "bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-orange-400/20"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                
                {/* Tubelight effect */}
                {(isActive || isHovered) && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-orange-500/30 blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Icon and label */}
                <div className="relative z-10 flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                
                {/* Sparkle effect for active item */}
                {isActive && (
                  <motion.div
                    className="absolute -top-1 -right-1 text-yellow-300"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className="h-3 w-3" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
        
        {/* Overall glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur-sm -z-10" />
      </motion.nav>
    </div>
  );
};
