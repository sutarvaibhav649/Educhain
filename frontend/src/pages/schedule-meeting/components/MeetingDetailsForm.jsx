import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const MeetingDetailsForm = ({ 
  formData, 
  onFormChange, 
  availableSkills, 
  errors 
}) => {
  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const formatOptions = [
    { value: 'virtual', label: 'Virtual Meeting', description: 'Online video call' },
    { value: 'in-person', label: 'In-Person', description: 'Meet at campus location' },
    { value: 'hybrid', label: 'Hybrid', description: 'Flexible format' }
  ];

  const platformOptions = [
    { value: 'zoom', label: 'Zoom' },
    { value: 'teams', label: 'Microsoft Teams' },
    { value: 'meet', label: 'Google Meet' },
    { value: 'discord', label: 'Discord' }
  ];

  const campusLocations = [
    { value: 'library-study-room-1', label: 'Library Study Room 1' },
    { value: 'library-study-room-2', label: 'Library Study Room 2' },
    { value: 'student-center-room-a', label: 'Student Center Room A' },
    { value: 'student-center-room-b', label: 'Student Center Room B' },
    { value: 'engineering-building-lab', label: 'Engineering Building Lab' },
    { value: 'business-building-conference', label: 'Business Building Conference Room' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="FileText" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Meeting Details</h3>
      </div>
      <div className="space-y-6">
        {/* Skill Selection */}
        <Select
          label="Select Skill"
          description="Choose the skill you want to learn"
          options={availableSkills}
          value={formData?.skillId}
          onChange={(value) => handleInputChange('skillId', value)}
          error={errors?.skillId}
          required
          searchable
          placeholder="Search for a skill..."
        />

        {/* Duration */}
        <Select
          label="Session Duration"
          description="How long should the session be?"
          options={durationOptions}
          value={formData?.duration}
          onChange={(value) => handleInputChange('duration', value)}
          error={errors?.duration}
          required
          placeholder="Select duration"
        />

        {/* Meeting Format */}
        <Select
          label="Meeting Format"
          description="Choose how you'd like to meet"
          options={formatOptions}
          value={formData?.format}
          onChange={(value) => handleInputChange('format', value)}
          error={errors?.format}
          required
          placeholder="Select format"
        />

        {/* Conditional Platform/Location Selection */}
        {formData?.format === 'virtual' && (
          <Select
            label="Video Platform"
            description="Which platform would you prefer?"
            options={platformOptions}
            value={formData?.platform}
            onChange={(value) => handleInputChange('platform', value)}
            error={errors?.platform}
            placeholder="Select platform"
          />
        )}

        {formData?.format === 'in-person' && (
          <Select
            label="Campus Location"
            description="Where would you like to meet?"
            options={campusLocations}
            value={formData?.location}
            onChange={(value) => handleInputChange('location', value)}
            error={errors?.location}
            searchable
            placeholder="Select location"
          />
        )}

        {formData?.format === 'hybrid' && (
          <div className="space-y-4">
            <Select
              label="Preferred Platform"
              description="Backup virtual option"
              options={platformOptions}
              value={formData?.platform}
              onChange={(value) => handleInputChange('platform', value)}
              placeholder="Select platform"
            />
            <Select
              label="Preferred Location"
              description="Backup in-person option"
              options={campusLocations}
              value={formData?.location}
              onChange={(value) => handleInputChange('location', value)}
              searchable
              placeholder="Select location"
            />
          </div>
        )}

        {/* Meeting Title */}
        <Input
          label="Meeting Title"
          type="text"
          placeholder="e.g., React Hooks Tutorial Session"
          value={formData?.title}
          onChange={(e) => handleInputChange('title', e?.target?.value)}
          error={errors?.title}
          description="Give your session a descriptive title"
        />

        {/* Agenda/Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Session Agenda
            <span className="text-muted-foreground ml-1">(Optional)</span>
          </label>
          <textarea
            rows={4}
            placeholder={`What would you like to cover in this session?\n\nExample:\n- Introduction to React Hooks\n- useState and useEffect examples\n- Hands-on coding practice\n- Q&A session`}
            value={formData?.agenda}
            onChange={(e) => handleInputChange('agenda', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Share what you'd like to learn or any specific topics to cover
          </p>
        </div>

        {/* Preparation Notes */}
        <Input
          label="Preparation Required"
          type="text"
          placeholder="e.g., Bring laptop with Node.js installed"
          value={formData?.preparation}
          onChange={(e) => handleInputChange('preparation', e?.target?.value)}
          description="Any materials or setup needed before the session"
        />

        {/* Special Requirements */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Special Requirements
          </label>
          
          <Checkbox
            label="Recording Permission"
            description="Allow session to be recorded for future reference"
            checked={formData?.allowRecording}
            onChange={(e) => handleInputChange('allowRecording', e?.target?.checked)}
          />
          
          <Checkbox
            label="Screen Sharing Required"
            description="Session will involve screen sharing or code review"
            checked={formData?.needsScreenShare}
            onChange={(e) => handleInputChange('needsScreenShare', e?.target?.checked)}
          />
          
          <Checkbox
            label="Beginner Friendly"
            description="No prior experience required for this topic"
            checked={formData?.beginnerFriendly}
            onChange={(e) => handleInputChange('beginnerFriendly', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailsForm;