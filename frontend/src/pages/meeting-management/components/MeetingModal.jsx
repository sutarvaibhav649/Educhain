import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MeetingModal = ({ meeting, isOpen, onClose, type, onConfirm }) => {
  if (!isOpen || !meeting) return null;

  const formatDateTime = (dateTime) => {
    return new Date(dateTime)?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getModalContent = () => {
    switch (type) {
      case 'details':
        return {
          title: 'Meeting Details',
          content: (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Skill Topic</h4>
                <p className="text-muted-foreground">{meeting?.skillTopic}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Category</h4>
                <p className="text-muted-foreground">{meeting?.category}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Date & Time</h4>
                <p className="text-muted-foreground">{formatDateTime(meeting?.dateTime)}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Duration</h4>
                <p className="text-muted-foreground">{meeting?.duration} minutes</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Participants</h4>
                <p className="text-muted-foreground">{meeting?.participants?.join(', ')}</p>
              </div>
              {meeting?.location && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Location</h4>
                  <p className="text-muted-foreground">{meeting?.location}</p>
                </div>
              )}
              {meeting?.description && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-muted-foreground">{meeting?.description}</p>
                </div>
              )}
            </div>
          ),
          actions: (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )
        };
      case 'cancel':
        return {
          title: 'Cancel Meeting',
          content: (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-error/10 rounded-lg">
                <Icon name="AlertTriangle" size={20} className="text-error" />
                <div>
                  <p className="font-medium text-foreground">Are you sure you want to cancel this meeting?</p>
                  <p className="text-sm text-muted-foreground mt-1">This action cannot be undone.</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Meeting Details</h4>
                <p className="text-muted-foreground">{meeting?.skillTopic}</p>
                <p className="text-sm text-muted-foreground">{formatDateTime(meeting?.dateTime)}</p>
              </div>
            </div>
          ),
          actions: (
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Keep Meeting
              </Button>
              <Button variant="destructive" onClick={() => onConfirm(meeting)}>
                Cancel Meeting
              </Button>
            </div>
          )
        };
      case 'reschedule':
        return {
          title: 'Reschedule Meeting',
          content: (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-warning/10 rounded-lg">
                <Icon name="Calendar" size={20} className="text-warning" />
                <div>
                  <p className="font-medium text-foreground">Reschedule this meeting</p>
                  <p className="text-sm text-muted-foreground mt-1">You'll be redirected to the scheduling page.</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Current Meeting</h4>
                <p className="text-muted-foreground">{meeting?.skillTopic}</p>
                <p className="text-sm text-muted-foreground">{formatDateTime(meeting?.dateTime)}</p>
              </div>
            </div>
          ),
          actions: (
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="default" onClick={() => onConfirm(meeting)}>
                Reschedule
              </Button>
            </div>
          )
        };
      default:
        return { title: '', content: null, actions: null };
    }
  };

  const { title, content, actions } = getModalContent();

  return (
    <div className="fixed inset-0 z-1100 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-modal max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>
        <div className="p-6">
          {content}
        </div>
        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          {actions}
        </div>
      </div>
    </div>
  );
};

export default MeetingModal;