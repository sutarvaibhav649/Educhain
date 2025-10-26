import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onFilterChange, onClearFilters, isOpen, onClose, resultCount }) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'languages', label: 'Languages' },
    { value: 'business', label: 'Business' },
    { value: 'science', label: 'Science' },
    { value: 'arts', label: 'Arts' },
    { value: 'music', label: 'Music' }
  ];

  const proficiencyLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const universities = [
    { value: 'all', label: 'All Universities' },
    { value: 'stanford', label: 'Stanford University' },
    { value: 'mit', label: 'MIT' },
    { value: 'harvard', label: 'Harvard University' },
    { value: 'berkeley', label: 'UC Berkeley' },
    { value: 'caltech', label: 'Caltech' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'alphabetical', label: 'A to Z' },
    { value: 'meetings', label: 'Most Popular' }
  ];

  const handleInputChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleCheckboxChange = (field, checked) => {
    onFilterChange({ ...filters, [field]: checked });
  };

  const panelContent = (
    <div className="space-y-6">
      {/* Search */}
      <Input
        type="search"
        placeholder="Search skills, instructors, or keywords..."
        value={filters.search}
        onChange={(e) => handleInputChange('search', e.target.value)}
        className="w-full"
      />

      {/* Sort */}
      <Select
        label="Sort by"
        options={sortOptions}
        value={filters.sortBy}
        onChange={(value) => handleInputChange('sortBy', value)}
      />

      {/* Category */}
      <Select
        label="Category"
        options={categories}
        value={filters.category}
        onChange={(value) => handleInputChange('category', value)}
      />

      {/* Proficiency Level */}
      <Select
        label="Proficiency Level"
        options={proficiencyLevels}
        value={filters.proficiencyLevel}
        onChange={(value) => handleInputChange('proficiencyLevel', value)}
      />

      {/* University */}
      <Select
        label="University"
        options={universities}
        value={filters.university}
        onChange={(value) => handleInputChange('university', value)}
      />

      {/* Availability */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Availability</h4>
        <Checkbox
          label="Available today"
          checked={filters.availableToday}
          onChange={(e) => handleCheckboxChange('availableToday', e.target.checked)}
        />
        <Checkbox
          label="Available this week"
          checked={filters.availableThisWeek}
          onChange={(e) => handleCheckboxChange('availableThisWeek', e.target.checked)}
        />
        <Checkbox
          label="Online meetings only"
          checked={filters.onlineOnly}
          onChange={(e) => handleCheckboxChange('onlineOnly', e.target.checked)}
        />
      </div>

      {/* Minimum Rating */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Minimum Rating</h4>
        {[4, 3, 2, 1].map(rating => (
          <Checkbox
            key={rating}
            label={
              <div className="flex items-center space-x-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon key={i} name="Star" size={12} className={i < rating ? 'text-warning fill-current' : 'text-muted'} />
                ))}
                <span className="text-sm">& up</span>
              </div>
            }
            checked={filters.minRating === rating}
            onChange={(e) => handleInputChange('minRating', e.target.checked ? rating : 0)}
          />
        ))}
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        fullWidth
        onClick={onClearFilters}
        iconName="RotateCcw"
        iconPosition="left"
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Panel */}
      <div className="hidden lg:block w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          <span className="text-sm text-muted-foreground">{resultCount} results</span>
        </div>
        {panelContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-1100 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <div className="fixed top-0 right-0 w-80 max-w-[90vw] h-full bg-card shadow-modal overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card">
              <h3 className="text-lg font-semibold text-foreground">Filters</h3>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">{resultCount} results</span>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            <div className="p-4">{panelContent}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
