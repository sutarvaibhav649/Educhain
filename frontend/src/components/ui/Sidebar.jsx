import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/user-dashboard', 
      icon: 'LayoutDashboard',
      description: 'Overview and quick actions'
    },
    { 
      label: 'My Skills', 
      path: '/skill-management', 
      icon: 'BookOpen',
      description: 'Manage your expertise'
    },
    { 
      label: 'Browse Skills', 
      path: '/browse-skills', 
      icon: 'Search',
      description: 'Discover learning opportunities'
    },
    { 
      label: 'Meetings', 
      path: '/meeting-management', 
      icon: 'Calendar',
      description: 'Schedule and manage sessions'
    },
    { 
      label: 'Profile', 
      path: '/user-profile', 
      icon: 'User',
      description: 'Account settings'
    },
  ];

  const quickActions = [
    { label: 'Schedule Meeting', path: '/schedule-meeting', icon: 'Plus' },
    { label: 'Add Skill', action: 'add-skill', icon: 'BookPlus' },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleQuickAction = (action) => {
    if (action === 'add-skill') {
      // Handle add skill action
      console.log('Add skill action triggered');
    }
  };

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border z-1000 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Navigation
            </h2>
          )}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="ml-auto"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </Button>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`group flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-smooth hover-lift ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-card'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={isCollapsed ? item?.label : ''}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                className={`flex-shrink-0 ${isActivePath(item?.path) ? 'text-primary-foreground' : ''}`}
              />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item?.label}</div>
                  <div className="text-xs opacity-75 truncate">{item?.description}</div>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Quick Actions
            </h3>
          )}
          <div className="space-y-2">
            {quickActions?.map((action) => (
              action?.path ? (
                <Link
                  key={action?.path}
                  to={action?.path}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  title={isCollapsed ? action?.label : ''}
                >
                  <Icon name={action?.icon} size={16} className="flex-shrink-0" />
                  {!isCollapsed && <span>{action?.label}</span>}
                </Link>
              ) : (
                <button
                  key={action?.action}
                  onClick={() => handleQuickAction(action?.action)}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  title={isCollapsed ? action?.label : ''}
                >
                  <Icon name={action?.icon} size={16} className="flex-shrink-0" />
                  {!isCollapsed && <span>{action?.label}</span>}
                </button>
              )
            ))}
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={16} color="white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">Student User</div>
                <div className="text-xs text-muted-foreground truncate">student@university.edu</div>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <div className="mt-3 flex space-x-2">
              <Button variant="ghost" size="sm" className="flex-1">
                <Icon name="Settings" size={14} />
                <span className="ml-1">Settings</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="LogOut" size={14} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;