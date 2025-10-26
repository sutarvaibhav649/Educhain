import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MeetingCard = ({ meeting, onReschedule, onCancel, onJoin, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-success text-success-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      case 'canceled':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isUpcoming = meeting?.status === 'scheduled' && new Date(meeting.dateTime) > new Date();
  const canJoin = isUpcoming && new Date(meeting.dateTime) <= new Date(Date.now() + 15 * 60 * 1000);

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card hover-lift transition-smooth">
      <div className="flex flex-col space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-lg">{meeting?.skillTopic}</h3>
            <p className="text-sm text-muted-foreground mt-1">{meeting?.category}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting?.status)}`}>
            {meeting?.status?.charAt(0)?.toUpperCase() + meeting?.status?.slice(1)}
          </span>
        </div>

        {/* Meeting Details */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>{formatDateTime(meeting?.dateTime)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>{meeting?.duration} minutes</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Users" size={16} />
            <span>{meeting?.participants?.join(', ')}</span>
          </div>
          {meeting?.location && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={16} />
              <span>{meeting?.location}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(meeting)}
          >
            <Icon name="Eye" size={14} />
            <span className="ml-1">Details</span>
          </Button>

          {isUpcoming && (
            <>
              {canJoin && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onJoin(meeting)}
                >
                  <Icon name="Video" size={14} />
                  <span className="ml-1">Join</span>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReschedule(meeting)}
              >
                <Icon name="Calendar" size={14} />
                <span className="ml-1">Reschedule</span>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancel(meeting)}
              >
                <Icon name="X" size={14} />
                <span className="ml-1">Cancel</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;