import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      title: "Add New Skill",
      description: "Share your expertise with peers",
      icon: "Plus",
      variant: "default",
      path: "/skill-management"
    },
    {
      title: "Schedule Meeting",
      description: "Book a learning session",
      icon: "Calendar",
      variant: "outline",
      path: "/schedule-meeting"
    },
    {
      title: "Browse Skills",
      description: "Find skills to learn",
      icon: "Search",
      variant: "secondary",
      path: "/browse-skills"
    },
    {
      title: "View Profile",
      description: "Update your information",
      icon: "User",
      variant: "ghost",
      path: "/user-profile"
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action, index) => (
          <Link key={index} to={action?.path} className="block">
            <Button
              variant={action?.variant}
              iconName={action?.icon}
              iconPosition="left"
              fullWidth
              className="h-auto p-4 flex-col items-start text-left hover-lift"
            >
              <div className="font-medium text-sm mb-1">{action?.title}</div>
              <div className="text-xs opacity-75 font-normal">{action?.description}</div>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;