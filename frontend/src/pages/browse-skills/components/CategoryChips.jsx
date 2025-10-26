import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const CategoryChips = ({ selectedCategory, onCategoryChange }) => {
  const [skillCounts, setSkillCounts] = useState({});
  const categories = [
    { id: 'all', name: 'All Skills', icon: 'Grid3x3' },
    { id: 'programming', name: 'Programming', icon: 'Code' },
    { id: 'design', name: 'Design', icon: 'Palette' },
    { id: 'mathematics', name: 'Mathematics', icon: 'Calculator' },
    { id: 'languages', name: 'Languages', icon: 'Globe' },
    { id: 'business', name: 'Business', icon: 'Briefcase' },
    { id: 'science', name: 'Science', icon: 'Microscope' },
    { id: 'arts', name: 'Arts', icon: 'Brush' },
    { id: 'music', name: 'Music', icon: 'Music' },
  ];

  useEffect(() => {
    fetch('/api/skills/counts')
      .then(res => res.json())
      .then(data => setSkillCounts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-smooth hover-lift ${
            selectedCategory === category.id
              ? 'bg-primary text-primary-foreground shadow-card'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
          }`}
        >
          <Icon
            name={category.icon}
            size={16}
            className={selectedCategory === category.id ? 'text-primary-foreground' : 'text-muted-foreground'}
          />
          <span>{category.name}</span>
          {skillCounts[category.id] > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedCategory === category.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-background text-muted-foreground'
            }`}>
              {skillCounts[category.id]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
