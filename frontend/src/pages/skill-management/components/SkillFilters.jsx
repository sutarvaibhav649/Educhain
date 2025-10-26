import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SkillFilters = ({ filters, setFilters }) => {
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'programming', label: 'Programming & Development' },
    { value: 'design', label: 'Design & Creative' },
    { value: 'business', label: 'Business & Marketing' },
    { value: 'languages', label: 'Languages' },
    { value: 'mathematics', label: 'Mathematics & Science' },
    { value: 'music', label: 'Music & Arts' },
    { value: 'sports', label: 'Sports & Fitness' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <Input
        placeholder="Search by title"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <Select
        options={categoryOptions}
        value={filters.category}
        onChange={(value) => setFilters({ ...filters, category: value })}
      />
    </div>
  );
};

export default SkillFilters;
