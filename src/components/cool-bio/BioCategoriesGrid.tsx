
import React from 'react';
import { BioCategoryCard } from './BioCategoryCard';
import { bioCategories } from './BioCategoriesData';

export const BioCategoriesGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12 px-4">
      {bioCategories.map((category, index) => (
        <BioCategoryCard
          key={index}
          title={category.title}
          ideas={category.ideas}
          icon={category.icon}
          color={category.color}
        />
      ))}
    </div>
  );
};
