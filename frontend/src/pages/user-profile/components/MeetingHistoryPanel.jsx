import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MeetingHistoryPanel = ({ meetings, stats }) => {
  const [activeTab, setActiveTab] = useState('recent');

  const mockStats = {
    totalMeetings: 34,
    completedMeetings: 28,
    canceledMeetings: 6,
    averageRating: 4.7,
    totalHours: 52,
    ...stats
  };

  const recentMeetings = [
  {
    id: 1,
    title: "React Hooks Deep Dive",
    partner: "Sarah Chen",
    partnerAvatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
    partnerAvatarAlt: "Professional headshot of Asian woman with long black hair in white blouse",
    date: "2025-10-23",
    time: "2:00 PM",
    duration: "1.5 hours",
    status: "completed",
    rating: 5,
    skill: "React Development",
    type: "teaching"
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    partner: "David Rodriguez",
    partnerAvatar: "https://images.unsplash.com/photo-1585066047759-3438c34cf676",
    partnerAvatarAlt: "Professional headshot of Hispanic man with beard in navy suit",
    date: "2025-10-21",
    time: "4:30 PM",
    duration: "2 hours",
    status: "completed",
    rating: 4,
    skill: "Python Programming",
    type: "learning"
  },
  {
    id: 3,
    title: "UI Design Principles",
    partner: "Emma Thompson",
    partnerAvatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    partnerAvatarAlt: "Professional headshot of blonde woman in blue blazer smiling",
    date: "2025-10-25",
    time: "10:00 AM",
    duration: "1 hour",
    status: "scheduled",
    skill: "UI/UX Design",
    type: "learning"
  }];


  const upcomingMeetings = [
  {
    id: 4,
    title: "Advanced JavaScript Concepts",
    partner: "Michael Park",
    partnerAvatar: "https://images.unsplash.com/photo-1696489647375-30cae68481f2",
    partnerAvatarAlt: "Professional headshot of Asian man with glasses in gray sweater",
    date: "2025-10-26",
    time: "3:00 PM",
    duration: "1.5 hours",
    status: "scheduled",
    skill: "JavaScript",
    type: "teaching"
  },
  {
    id: 5,
    title: "Data Visualization with D3",
    partner: "Lisa Wang",
    partnerAvatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
    partnerAvatarAlt: "Professional headshot of Asian woman with short hair in black top",
    date: "2025-10-28",
    time: "1:00 PM",
    duration: "2 hours",
    status: "scheduled",
    skill: "Data Science",
    type: "learning"
  }];


  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'scheduled':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'canceled':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'teaching' ? 'GraduationCap' : 'BookOpen';
  };

  const getTypeColor = (type) => {
    return type === 'teaching' ? 'text-accent' : 'text-secondary';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
    <Icon
      key={i}
      name="Star"
      size={12}
      color={i < rating ? "var(--color-warning)" : "var(--color-muted-foreground)"} />

    );
  };

  const displayMeetings = activeTab === 'recent' ? recentMeetings : upcomingMeetings;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Meeting History</h3>
        <Link to="/meeting-management">
          <Button variant="outline" size="sm">
            <Icon name="Calendar" size={16} />
            View All
          </Button>
        </Link>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-xl font-bold text-primary">{mockStats?.totalMeetings}</div>
          <div className="text-xs text-muted-foreground">Total Meetings</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-xl font-bold text-success">{mockStats?.completedMeetings}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-xl font-bold text-accent">{mockStats?.totalHours}h</div>
          <div className="text-xs text-muted-foreground">Total Hours</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-xl font-bold text-warning">{mockStats?.averageRating}</span>
            <Icon name="Star" size={16} color="var(--color-warning)" />
          </div>
          <div className="text-xs text-muted-foreground">Avg Rating</div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-muted/30 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('recent')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
          activeTab === 'recent' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
          }>

          Recent
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
          activeTab === 'upcoming' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
          }>

          Upcoming
        </button>
      </div>
      {/* Meetings List */}
      <div className="space-y-3">
        {displayMeetings?.map((meeting) =>
        <div key={meeting?.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <img
                  src={meeting?.partnerAvatar}
                  alt={meeting?.partnerAvatarAlt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }} />

                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {meeting?.title}
                    </h4>
                    <Icon
                    name={getTypeIcon(meeting?.type)}
                    size={14}
                    className={getTypeColor(meeting?.type)} />

                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    with {meeting?.partner} • {meeting?.skill}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span>{meeting?.date}</span>
                    <span>{meeting?.time}</span>
                    <span>{meeting?.duration}</span>
                  </div>
                  {meeting?.status === 'completed' && meeting?.rating &&
                <div className="flex items-center space-x-1 mt-2">
                      {renderStars(meeting?.rating)}
                    </div>
                }
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(meeting?.status)}`}>
                  {meeting?.status}
                </span>
                <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Link to="/schedule-meeting" className="flex-1">
            <Button variant="default" fullWidth>
              <Icon name="Plus" size={16} />
              Schedule Meeting
            </Button>
          </Link>
          <Link to="/meeting-management" className="flex-1">
            <Button variant="outline" fullWidth>
              <Icon name="Calendar" size={16} />
              Manage Meetings
            </Button>
          </Link>
        </div>
      </div>
    </div>);

};

export default MeetingHistoryPanel;