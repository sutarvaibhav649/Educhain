import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import axios from 'axios';

const SkillForm = ({ skill = null, isVisible, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    proficiency: 3,
    tags: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    if (skill) {
      setFormData({
        title: skill.title || '',
        description: skill.description || '',
        category: skill.category || '',
        proficiency: skill.proficiency || 3,
        tags: skill.tags?.join(', ') || ''
      });
    } else {
      setFormData({ title: '', description: '', category: '', proficiency: 3, tags: '' });
    }
    setErrors({});
  }, [skill, isVisible]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags?.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      if (skill?.id) {
        await axios.put(`http://localhost:8080/api/skills/${skill.id}`, payload);
      } else {
        await axios.post('http://localhost:8080/api/skills', payload);
      }

      onSuccess?.();
      onCancel?.();
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {skill ? 'Edit Skill' : 'Add Skill'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <Icon name="X" size={20} />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            label="Skill Title"
            type="text"
            placeholder="React, Python..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={4}
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
          </div>
          <Select
            label="Category"
            options={categoryOptions}
            value={categoryOptions.find(opt => opt.value === formData.category)}
            onChange={(selectedOption) => 
              setFormData({ ...formData, category: selectedOption?.value || '' })
            }
            error={errors.category}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proficiency: {formData.proficiency}/5
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.proficiency}
              onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <Input
            label="Tags (comma-separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" loading={isSubmitting} iconName="Save" iconPosition="left">
              {skill ? 'Update Skill' : 'Add Skill'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;
