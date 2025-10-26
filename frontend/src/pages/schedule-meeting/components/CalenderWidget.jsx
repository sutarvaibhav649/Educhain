import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarWidget = ({ selectedDate, onDateSelect, availableSlots }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  const year = currentMonth?.getFullYear();
  const month = currentMonth?.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth?.getDay();
  const daysInMonth = lastDayOfMonth?.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth?.setMonth(prev?.getMonth() + direction);
      return newMonth;
    });
  };

  const isDateAvailable = (date) => {
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return availableSlots?.some(slot => slot?.date === dateStr);
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const isPastDate = (date) => {
    return date < today?.setHours(0, 0, 0, 0);
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(year, month, day);
    if (!isPastDate(clickedDate) && isDateAvailable(clickedDate)) {
      onDateSelect(clickedDate);
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days?.push(
        <div key={`empty-${i}`} className="h-10 md:h-12"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isAvailable = isDateAvailable(date);
      const isSelected = isDateSelected(date);
      const isPast = isPastDate(date);

      days?.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={isPast || !isAvailable}
          className={`h-10 md:h-12 w-full rounded-lg text-sm font-medium transition-smooth hover-lift ${
            isSelected
              ? 'bg-primary text-primary-foreground shadow-card'
              : isAvailable && !isPast
              ? 'bg-card hover:bg-muted text-foreground border border-border'
              : isPast
              ? 'text-muted-foreground cursor-not-allowed opacity-50'
              : 'text-muted-foreground cursor-not-allowed'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {monthNames?.[month]} {year}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(-1)}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(1)}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames?.map(day => (
          <div key={day} className="h-8 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              {day}
            </span>
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span className="text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-card border border-border rounded"></div>
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-muted rounded opacity-50"></div>
          <span className="text-muted-foreground">Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;