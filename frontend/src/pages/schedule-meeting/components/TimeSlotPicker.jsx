import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TimeSlotPicker = ({ selectedDate, selectedTime, onTimeSelect, availableSlots }) => {
  if (!selectedDate) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Date First</h3>
          <p className="text-muted-foreground">
            Choose a date from the calendar to view available time slots
          </p>
        </div>
      </div>
    );
  }

  const dateStr = selectedDate?.toISOString()?.split('T')?.[0];
  const daySlots = availableSlots?.find(slot => slot?.date === dateStr);

  if (!daySlots || !daySlots?.times?.length) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Available Times</h3>
          <p className="text-muted-foreground">
            No time slots are available for {selectedDate?.toLocaleDateString()}
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

  const timeSlots = [
    { period: 'Morning', times: daySlots?.times?.filter(t => parseInt(t?.split(':')?.[0]) < 12) },
    { period: 'Afternoon', times: daySlots?.times?.filter(t => {
      const hour = parseInt(t?.split(':')?.[0]);
      return hour >= 12 && hour < 17;
    })},
    { period: 'Evening', times: daySlots?.times?.filter(t => parseInt(t?.split(':')?.[0]) >= 17) }
  ]?.filter(period => period?.times?.length > 0);

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Available Times</h3>
        <div className="text-sm text-muted-foreground">
          {selectedDate?.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      <div className="space-y-6">
        {timeSlots?.map(period => (
          <div key={period?.period}>
            <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              {period?.period}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {period?.times?.map(time => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTimeSelect(time)}
                  className="justify-center"
                >
                  <Icon name="Clock" size={14} className="mr-2" />
                  {formatTime(time)}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedTime && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">
              Selected: {formatTime(selectedTime)} on {selectedDate?.toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;