import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PrivacySettingsPanel = ({ initialSettings, onSave }) => {
  const [settings, setSettings] = useState({
    profileVisibility: 'university',
    showEmail: false,
    showPhone: false,
    allowDirectMessages: true,
    showSkillRatings: true,
    showMeetingHistory: false,
    allowSkillRecommendations: true,
    dataSharing: false,
    marketingEmails: false,
    meetingNotifications: true,
    skillMatchNotifications: true,
    weeklyDigest: true,
    ...initialSettings
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const visibilityOptions = [
    { 
      value: 'public', 
      label: 'Public', 
      description: 'Visible to all EduChain users' 
    },
    { 
      value: 'university', 
      label: 'University Only', 
      description: 'Visible only to students from your university' 
    },
    { 
      value: 'connections', 
      label: 'Connections Only', 
      description: 'Visible only to your learning partners' 
    },
    { 
      value: 'private', 
      label: 'Private', 
      description: 'Not visible in search results' 
    }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSave?.(settings);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving privacy settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(initialSettings || {});
    setHasChanges(false);
  };

  const privacySettings = [
    {
      category: 'Profile Visibility',
      icon: 'Eye',
      settings: [
        {
          key: 'profileVisibility',
          type: 'select',
          label: 'Who can see your profile',
          description: 'Control who can view your profile information',
          options: visibilityOptions
        },
        {
          key: 'showEmail',
          type: 'checkbox',
          label: 'Show email address',
          description: 'Display your email on your public profile'
        },
        {
          key: 'showPhone',
          type: 'checkbox',
          label: 'Show phone number',
          description: 'Display your phone number to verified users'
        }
      ]
    },
    {
      category: 'Communication',
      icon: 'MessageSquare',
      settings: [
        {
          key: 'allowDirectMessages',
          type: 'checkbox',
          label: 'Allow direct messages',
          description: 'Let other students send you private messages'
        },
        {
          key: 'showSkillRatings',
          type: 'checkbox',
          label: 'Show skill ratings',
          description: 'Display ratings and reviews from other students'
        },
        {
          key: 'showMeetingHistory',
          type: 'checkbox',
          label: 'Show meeting history',
          description: 'Display your past learning sessions on your profile'
        }
      ]
    },
    {
      category: 'Recommendations & Matching',
      icon: 'Target',
      settings: [
        {
          key: 'allowSkillRecommendations',
          type: 'checkbox',
          label: 'Skill-based recommendations',
          description: 'Receive suggestions for learning partners and skills'
        },
        {
          key: 'dataSharing',
          type: 'checkbox',
          label: 'Anonymous usage analytics',
          description: 'Help improve EduChain by sharing anonymous usage data'
        }
      ]
    },
    {
      category: 'Notifications',
      icon: 'Bell',
      settings: [
        {
          key: 'meetingNotifications',
          type: 'checkbox',
          label: 'Meeting reminders',
          description: 'Get notified about upcoming meetings and schedule changes'
        },
        {
          key: 'skillMatchNotifications',
          type: 'checkbox',
          label: 'Skill match alerts',
          description: 'Receive notifications when someone needs your skills'
        },
        {
          key: 'weeklyDigest',
          type: 'checkbox',
          label: 'Weekly activity digest',
          description: 'Get a summary of your learning activities and opportunities'
        },
        {
          key: 'marketingEmails',
          type: 'checkbox',
          label: 'Marketing communications',
          description: 'Receive updates about new features and educational content'
        }
      ]
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Privacy & Communication</h3>
        {hasChanges && (
          <div className="flex items-center space-x-2 text-sm text-warning">
            <Icon name="AlertCircle" size={16} />
            <span>Unsaved changes</span>
          </div>
        )}
      </div>
      <div className="space-y-8">
        {privacySettings?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-border">
              <Icon name={category?.icon} size={18} color="var(--color-primary)" />
              <h4 className="text-sm font-semibold text-foreground">{category?.category}</h4>
            </div>

            <div className="space-y-4 pl-6">
              {category?.settings?.map((setting) => (
                <div key={setting?.key} className="space-y-2">
                  {setting?.type === 'select' ? (
                    <Select
                      label={setting?.label}
                      description={setting?.description}
                      options={setting?.options}
                      value={settings?.[setting?.key]}
                      onChange={(value) => handleSettingChange(setting?.key, value)}
                    />
                  ) : (
                    <Checkbox
                      label={setting?.label}
                      description={setting?.description}
                      checked={settings?.[setting?.key]}
                      onChange={(e) => handleSettingChange(setting?.key, e?.target?.checked)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Privacy Notice */}
      <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border/50">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Your Privacy Matters</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              EduChain is committed to protecting your privacy. We use industry-standard encryption 
              to secure your data and never share your personal information with third parties without 
              your explicit consent. You can update these settings anytime.
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <a href="#" className="text-xs text-primary hover:underline">Privacy Policy</a>
              <a href="#" className="text-xs text-primary hover:underline">Data Usage</a>
              <a href="#" className="text-xs text-primary hover:underline">Contact Support</a>
            </div>
          </div>
        </div>
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
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
};

export default PrivacySettingsPanel;