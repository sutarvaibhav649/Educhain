import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const UpcomingMeetingsPanel = ({ meetings }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'cancelled': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === tomorrow?.toDateString()) {
      return 'Tomorrow';
    } else {
      return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Calendar" size={20} className="mr-2 text-primary" />
          Upcoming Meetings
        </h3>
        <Link to="/meeting-management">
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>
      {meetings?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">No upcoming meetings</p>
          <Link to="/schedule-meeting">
            <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
              Schedule Meeting
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {meetings?.slice(0, 3)?.map((meeting) => (
            <div key={meeting?.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-smooth">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Image
                    src={meeting?.partnerAvatar}
                    alt={meeting?.partnerAvatarAlt}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-foreground">{meeting?.partnerName}</h4>
                    <p className="text-sm text-muted-foreground">{meeting?.skillTopic}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting?.status)}`}>
                  {meeting?.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    {formatDate(meeting?.dateTime)}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Clock" size={14} className="mr-1" />
                    {formatTime(meeting?.dateTime)}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Timer" size={14} className="mr-1" />
                    {meeting?.duration}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {meeting?.status === 'confirmed' && (
                    <Button variant="success" size="sm" iconName="Video">
                      Join
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                </div>
              </div>
            </div>
          ))}

          {meetings?.length > 3 && (
            <div className="text-center pt-2">
              <Link to="/meeting-management">
                <Button variant="ghost" size="sm" className="text-primary">
                  +{meetings?.length - 3} more meetings
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingMeetingsPanel;