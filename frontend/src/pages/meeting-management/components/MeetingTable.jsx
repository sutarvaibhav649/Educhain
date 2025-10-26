import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MeetingTable = ({ meetings, onReschedule, onCancel, onJoin, onViewDetails }) => {
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

  const isUpcoming = (meeting) => {
    return meeting?.status === 'scheduled' && new Date(meeting.dateTime) > new Date();
  };

  const canJoin = (meeting) => {
    return isUpcoming(meeting) && new Date(meeting.dateTime) <= new Date(Date.now() + 15 * 60 * 1000);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Skill Topic</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Date & Time</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Participants</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings?.map((meeting) => (
            <tr key={meeting?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
              <td className="py-4 px-4">
                <div>
                  <div className="font-medium text-foreground">{meeting?.skillTopic}</div>
                  <div className="text-sm text-muted-foreground">{meeting?.category}</div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="text-sm text-foreground">{formatDateTime(meeting?.dateTime)}</div>
                {meeting?.location && (
                  <div className="text-xs text-muted-foreground flex items-center mt-1">
                    <Icon name="MapPin" size={12} />
                    <span className="ml-1">{meeting?.location}</span>
                  </div>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="text-sm text-foreground">
                  {meeting?.participants?.join(', ')}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="text-sm text-foreground">{meeting?.duration} min</div>
              </td>
              <td className="py-4 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting?.status)}`}>
                  {meeting?.status?.charAt(0)?.toUpperCase() + meeting?.status?.slice(1)}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(meeting)}
                  >
                    <Icon name="Eye" size={14} />
                  </Button>

                  {isUpcoming(meeting) && (
                    <>
                      {canJoin(meeting) && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onJoin(meeting)}
                        >
                          <Icon name="Video" size={14} />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onReschedule(meeting)}
                      >
                        <Icon name="Calendar" size={14} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onCancel(meeting)}
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingTable;