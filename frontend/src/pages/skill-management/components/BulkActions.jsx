import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import axios from 'axios';

const BulkActions = ({ selectedIds, onSuccess }) => {
  const [category, setCategory] = useState('');
  const categoryOptions = [
    { value: 'programming', label: 'Programming & Development' },
    { value: 'design', label: 'Design & Creative' },
    { value: 'business', label: 'Business & Marketing' },
    { value: 'languages', label: 'Languages' },
    { value: 'mathematics', label: 'Mathematics & Science' },
    { value: 'music', label: 'Music & Arts' },
    { value: 'sports', label: 'Sports & Fitness' },
    { value: 'other', label: 'Other' }
  ];

  const handleBulkCategory = async () => {
    if (!category || selectedIds.length === 0) return;
    try {
      await axios.put('/skills/bulk-category', { ids: selectedIds, category });
      onSuccess();
    } catch (err) {
      console.error(err);
      alert('Bulk update failed!');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    try {
      await axios.delete('/skills/bulk-delete', { data: { ids: selectedIds } });
      onSuccess();
    } catch (err) {
      console.error(err);
      alert('Bulk delete failed!');
    }
  };

  return (
    <div className="flex items-center space-x-3 mb-4">
      <Select
        placeholder="Change Category"
        options={categoryOptions}
        value={category}
        onChange={setCategory}
      />
      <Button onClick={handleBulkCategory} disabled={selectedIds.length === 0}>Update Category</Button>
      <Button variant="destructive" onClick={handleBulkDelete} disabled={selectedIds.length === 0}>
        Delete Selected
      </Button>
    </div>
  );
};

export default BulkActions;
