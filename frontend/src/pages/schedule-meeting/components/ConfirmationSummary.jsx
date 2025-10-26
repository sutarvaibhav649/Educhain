import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ConfirmationSummary = ({ 
  selectedDate, 
  selectedTime, 
  formData, 
  instructor, 
  onConfirm, 
  onEdit, 
  isLoading 
}) => {
  if (!selectedDate || !selectedTime || !formData?.skillId) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <Icon name="AlertCircle" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Complete Required Fields</h3>
          <p className="text-muted-foreground">
            Please fill in all required information to see the meeting summary
          </p>
        </div>
      </div>
    );
  }

  const formatTime = (time) => {
    const [hours, minutes] = time?.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDurationText = (duration) => {
    const minutes = parseInt(duration);
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  const getEndTime = () => {
    const [hours, minutes] = selectedTime?.split(':');
    const startMinutes = parseInt(hours) * 60 + parseInt(minutes);
    const endMinutes = startMinutes + parseInt(formData?.duration);
    const endHours = Math.floor(endMinutes / 60) % 24;
    const endMins = endMinutes % 60;
    const endTime = `${endHours?.toString()?.padStart(2, '0')}:${endMins?.toString()?.padStart(2, '0')}`;
    return formatTime(endTime);
  };

  const selectedSkill = formData?.skillId ? { name: 'React Development', category: 'Web Development' } : null;

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="CheckCircle" size={20} className="text-success" />
        <h3 className="text-lg font-semibold text-foreground">Meeting Summary</h3>
      </div>
      <div className="space-y-6">
        {/* Meeting Overview */}
        <div className="bg-primary/5 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">{formData?.title || 'Skill Learning Session'}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{formatDate(selectedDate)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(selectedTime)} - {getEndTime()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{getDurationText(formData?.duration)}</p>
                  <p className="text-xs text-muted-foreground">Session duration</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{selectedSkill?.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedSkill?.category}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name={formData?.format === 'virtual' ? 'Video' : formData?.format === 'in-person' ? 'MapPin' : 'Zap'} size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground capitalize">{formData?.format} Meeting</p>
                  <p className="text-xs text-muted-foreground">
                    {formData?.format === 'virtual' && formData?.platform && `via ${formData?.platform}`}
                    {formData?.format === 'in-person' && formData?.location && formData?.location?.replace(/-/g, ' ')}
                    {formData?.format === 'hybrid' && 'Flexible format'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Info */}
        <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
          <Image
            src={instructor?.avatar}
            alt={instructor?.avatarAlt}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{instructor?.name}</p>
            <p className="text-xs text-muted-foreground">{instructor?.major}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="Star" size={12} className="text-warning" />
              <span className="text-xs text-muted-foreground">{instructor?.rating} rating</span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="MessageCircle" size={14} />
          </Button>
        </div>

        {/* Session Details */}
        {(formData?.agenda || formData?.preparation) && (
          <div className="space-y-4">
            {formData?.agenda && (
              <div>
                <h5 className="text-sm font-semibold text-foreground mb-2">Session Agenda</h5>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm text-foreground whitespace-pre-line">{formData?.agenda}</p>
                </div>
              </div>
            )}
            
            {formData?.preparation && (
              <div>
                <h5 className="text-sm font-semibold text-foreground mb-2">Preparation Required</h5>
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                    <p className="text-sm text-foreground">{formData?.preparation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Special Requirements */}
        {(formData?.allowRecording || formData?.needsScreenShare || formData?.beginnerFriendly) && (
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-3">Session Features</h5>
            <div className="flex flex-wrap gap-2">
              {formData?.allowRecording && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                  <Icon name="Video" size={12} className="mr-1" />
                  Recording Allowed
                </span>
              )}
              {formData?.needsScreenShare && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                  <Icon name="Monitor" size={12} className="mr-1" />
                  Screen Sharing
                </span>
              )}
              {formData?.beginnerFriendly && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  <Icon name="Heart" size={12} className="mr-1" />
                  Beginner Friendly
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onEdit}
            className="flex-1 sm:flex-none"
            disabled={isLoading}
          >
            <Icon name="Edit" size={16} />
            <span className="ml-2">Edit Details</span>
          </Button>
          
          <Button
            variant="default"
            onClick={onConfirm}
            loading={isLoading}
            className="flex-1"
          >
            <Icon name="Calendar" size={16} />
            <span className="ml-2">Confirm & Schedule Meeting</span>
          </Button>
        </div>

        {/* Terms Notice */}
        <div className="bg-muted/30 rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            <Icon name="Info" size={12} className="inline mr-1" />
            By scheduling this meeting, you agree to EduChain's community guidelines and meeting policies. You'll receive email confirmations and calendar invites for this session.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationSummary;