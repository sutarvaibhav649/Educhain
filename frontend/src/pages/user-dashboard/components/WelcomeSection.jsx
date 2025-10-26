import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ user, stats }) => {
  const currentHour = new Date()?.getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {getGreeting()}, {user?.name}!
          </h1>
          <p className="text-primary-foreground/80 text-sm lg:text-base">
            {user?.university} • {user?.program}
          </p>
          <p className="text-primary-foreground/70 text-xs lg:text-sm mt-1">
            Ready to share knowledge and learn something new today?
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 lg:gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2 mx-auto">
              <Icon name="BookOpen" size={20} color="white" />
            </div>
            <div className="text-xl lg:text-2xl font-bold">{stats?.skillsShared}</div>
            <div className="text-xs lg:text-sm text-primary-foreground/80">Skills Shared</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2 mx-auto">
              <Icon name="Calendar" size={20} color="white" />
            </div>
            <div className="text-xl lg:text-2xl font-bold">{stats?.meetingsScheduled}</div>
            <div className="text-xs lg:text-sm text-primary-foreground/80">Meetings</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-2 mx-auto">
              <Icon name="Clock" size={20} color="white" />
            </div>
            <div className="text-xl lg:text-2xl font-bold">{stats?.learningHours}</div>
            <div className="text-xs lg:text-sm text-primary-foreground/80">Hours Learned</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;