import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MySkillsPanel = ({ skills }) => {
  const getProficiencyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'text-warning';
      case 'intermediate': return 'text-accent';
      case 'advanced': return 'text-success';
      case 'expert': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getProficiencyBg = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-warning/10';
      case 'intermediate': return 'bg-accent/10';
      case 'advanced': return 'bg-success/10';
      case 'expert': return 'bg-primary/10';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2 text-primary" />
          My Skills
        </h3>
        <Link to="/skill-management">
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>
      {skills?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="BookOpen" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">No skills added yet</p>
          <Link to="/skill-management">
            <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
              Add Your First Skill
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {skills?.slice(0, 4)?.map((skill) => (
            <div key={skill?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground truncate">{skill?.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProficiencyBg(skill?.proficiency)} ${getProficiencyColor(skill?.proficiency)}`}>
                    {skill?.proficiency}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{skill?.category}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Users" size={12} className="mr-1" />
                    {skill?.interestedCount} interested
                  </span>
                  <span className="flex items-center">
                    <Icon name="Calendar" size={12} className="mr-1" />
                    {skill?.meetingsCount} meetings
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button variant="ghost" size="sm" iconName="Edit2" />
                <Button variant="ghost" size="sm" iconName="Trash2" className="text-error hover:text-error" />
              </div>
            </div>
          ))}
          
          {skills?.length > 4 && (
            <div className="text-center pt-2">
              <Link to="/skill-management">
                <Button variant="ghost" size="sm" className="text-primary">
                  +{skills?.length - 4} more skills
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MySkillsPanel;