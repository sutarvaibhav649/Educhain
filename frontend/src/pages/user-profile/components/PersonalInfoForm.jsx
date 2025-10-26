import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalInfoForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "Alex",
    lastName: initialData?.lastName || "Johnson",
    email: initialData?.email || "alex.johnson@university.edu",
    phone: initialData?.phone || "+1 (555) 123-4567",
    bio: initialData?.bio || `Computer Science student passionate about web development and machine learning. I enjoy teaching programming concepts and learning new technologies. Always excited to collaborate on innovative projects and share knowledge with fellow students.`,
    university: initialData?.university || "Stanford University",
    graduationYear: initialData?.graduationYear || "2025",
    major: initialData?.major || "Computer Science",
    gpa: initialData?.gpa || "3.8",
    linkedinUrl: initialData?.linkedinUrl || "https://linkedin.com/in/alexjohnson",
    githubUrl: initialData?.githubUrl || "https://github.com/alexjohnson",
    ...initialData
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const universityOptions = [
    { value: "Stanford University", label: "Stanford University" },
    { value: "MIT", label: "Massachusetts Institute of Technology" },
    { value: "Harvard University", label: "Harvard University" },
    { value: "UC Berkeley", label: "University of California, Berkeley" },
    { value: "Carnegie Mellon", label: "Carnegie Mellon University" },
    { value: "Caltech", label: "California Institute of Technology" },
    { value: "Princeton University", label: "Princeton University" },
    { value: "Yale University", label: "Yale University" },
    { value: "Other", label: "Other University" }
  ];

  const graduationYearOptions = [
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" }
  ];

  const majorOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Software Engineering", label: "Software Engineering" },
    { value: "Data Science", label: "Data Science" },
    { value: "Information Technology", label: "Information Technology" },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Physics", label: "Physics" },
    { value: "Business Administration", label: "Business Administration" },
    { value: "Other", label: "Other" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.university) {
      newErrors.university = 'University is required';
    }

    if (!formData?.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
    }

    if (!formData?.major) {
      newErrors.major = 'Major is required';
    }

    if (formData?.bio?.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    if (formData?.gpa && (isNaN(formData?.gpa) || formData?.gpa < 0 || formData?.gpa > 4.0)) {
      newErrors.gpa = 'GPA must be between 0.0 and 4.0';
    }

    if (formData?.linkedinUrl && !formData?.linkedinUrl?.includes('linkedin.com')) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }

    if (formData?.githubUrl && !formData?.githubUrl?.includes('github.com')) {
      newErrors.githubUrl = 'Please enter a valid GitHub URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSave(formData);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setErrors({});
    setHasChanges(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
        {hasChanges && (
          <div className="flex items-center space-x-2 text-sm text-warning">
            <Icon name="AlertCircle" size={16} />
            <span>Unsaved changes</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <Input
            label="First Name"
            type="text"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
            placeholder="Enter your first name"
          />

          <Input
            label="Last Name"
            type="text"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
            placeholder="Enter your last name"
          />

          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            description="Use your university email for verification"
            placeholder="your.email@university.edu"
          />

          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Academic Information */}
        <div className="space-y-4">
          <Select
            label="University"
            options={universityOptions}
            value={formData?.university}
            onChange={(value) => handleInputChange('university', value)}
            error={errors?.university}
            required
            searchable
            placeholder="Select your university"
          />

          <Select
            label="Major"
            options={majorOptions}
            value={formData?.major}
            onChange={(value) => handleInputChange('major', value)}
            error={errors?.major}
            required
            searchable
            placeholder="Select your major"
          />

          <Select
            label="Graduation Year"
            options={graduationYearOptions}
            value={formData?.graduationYear}
            onChange={(value) => handleInputChange('graduationYear', value)}
            error={errors?.graduationYear}
            required
            placeholder="Select graduation year"
          />

          <Input
            label="GPA (Optional)"
            type="number"
            value={formData?.gpa}
            onChange={(e) => handleInputChange('gpa', e?.target?.value)}
            error={errors?.gpa}
            placeholder="3.8"
            min="0"
            max="4"
            step="0.1"
          />
        </div>
      </div>
      {/* Bio Section */}
      <div className="mt-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Bio
          </label>
          <textarea
            value={formData?.bio}
            onChange={(e) => handleInputChange('bio', e?.target?.value)}
            placeholder="Tell other students about yourself, your interests, and what you're passionate about..."
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            rows={4}
            maxLength={500}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Share your interests, goals, and what makes you unique
            </p>
            <span className={`text-xs ${formData?.bio?.length > 450 ? 'text-warning' : 'text-muted-foreground'}`}>
              {formData?.bio?.length}/500
            </span>
          </div>
          {errors?.bio && (
            <p className="text-xs text-error">{errors?.bio}</p>
          )}
        </div>
      </div>
      {/* Social Links */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="LinkedIn Profile (Optional)"
          type="url"
          value={formData?.linkedinUrl}
          onChange={(e) => handleInputChange('linkedinUrl', e?.target?.value)}
          error={errors?.linkedinUrl}
          placeholder="https://linkedin.com/in/yourprofile"
        />

        <Input
          label="GitHub Profile (Optional)"
          type="url"
          value={formData?.githubUrl}
          onChange={(e) => handleInputChange('githubUrl', e?.target?.value)}
          error={errors?.githubUrl}
          placeholder="https://github.com/yourusername"
        />
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-8 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!hasChanges || isSaving}
        >
          Reset Changes
        </Button>
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          disabled={!hasChanges}
          iconName="Save"
          iconPosition="left"
        >
          {isSaving ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;