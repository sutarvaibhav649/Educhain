import React from 'react';
import Icon from '../../../components/AppIcon';

const MeetingStats = ({ meetings }) => {
  const totalMeetings = meetings?.length;
  const upcomingMeetings = meetings?.filter(m => 
    m?.status === 'scheduled' && new Date(m.dateTime) > new Date()
  )?.length;
  const completedMeetings = meetings?.filter(m => m?.status === 'completed')?.length;
  const canceledMeetings = meetings?.filter(m => m?.status === 'canceled')?.length;

  const stats = [
    {
      label: 'Total Meetings',
      value: totalMeetings,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Upcoming',
      value: upcomingMeetings,
      icon: 'Clock',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Completed',
      value: completedMeetings,
      icon: 'CheckCircle',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Canceled',
      value: canceledMeetings,
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-card">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingStats;