import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivityPanel = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'skill_added': return 'Plus';
      case 'meeting_scheduled': return 'Calendar';
      case 'meeting_completed': return 'CheckCircle';
      case 'skill_request': return 'MessageCircle';
      case 'profile_updated': return 'User';
      case 'achievement': return 'Award';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'skill_added': return 'text-success';
      case 'meeting_scheduled': return 'text-primary';
      case 'meeting_completed': return 'text-accent';
      case 'skill_request': return 'text-warning';
      case 'profile_updated': return 'text-secondary';
      case 'achievement': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Activity" size={20} className="mr-2 text-primary" />
          Recent Activity
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      {activities?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 hover:bg-muted/30 rounded-lg transition-smooth">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-muted ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={14} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{activity?.title}</p>
                  <span className="text-xs text-muted-foreground">{formatTimeAgo(activity?.timestamp)}</span>
                </div>
                <p className="text-sm text-muted-foreground">{activity?.description}</p>
                
                {activity?.relatedUser && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Image
                      src={activity?.relatedUser?.avatar}
                      alt={activity?.relatedUser?.avatarAlt}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-muted-foreground">{activity?.relatedUser?.name}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivityPanel;