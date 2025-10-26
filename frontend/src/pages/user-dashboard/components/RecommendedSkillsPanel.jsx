import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecommendedSkillsPanel = ({ recommendedSkills }) => {
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'programming': return 'Code';
      case 'design': return 'Palette';
      case 'business': return 'Briefcase';
      case 'language': return 'MessageSquare';
      case 'science': return 'Microscope';
      case 'mathematics': return 'Calculator';
      default: return 'BookOpen';
    }
  };

  const getProficiencyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'text-warning';
      case 'intermediate': return 'text-accent';
      case 'advanced': return 'text-success';
      case 'expert': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Lightbulb" size={20} className="mr-2 text-primary" />
          Recommended for You
        </h3>
        <Link to="/browse-skills">
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            Browse All
          </Button>
        </Link>
      </div>
      {recommendedSkills?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Lightbulb" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No recommendations available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendedSkills?.slice(0, 4)?.map((skill) => (
            <div key={skill?.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-smooth hover-lift">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                    <Icon name={getCategoryIcon(skill?.category)} size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{skill?.title}</h4>
                    <p className="text-sm text-muted-foreground">{skill?.category}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium ${getProficiencyColor(skill?.proficiency)}`}>
                  {skill?.proficiency}
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Image
                    src={skill?.teacherAvatar}
                    alt={skill?.teacherAvatarAlt}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-muted-foreground">{skill?.teacherName}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Star" size={12} className="mr-1 text-warning" />
                    {skill?.rating}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Users" size={12} className="mr-1" />
                    {skill?.studentsCount}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{skill?.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {skill?.tags?.slice(0, 2)?.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full">
                      {tag}
                    </span>
                  ))}
                  {skill?.tags?.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{skill?.tags?.length - 2}</span>
                  )}
                </div>
                <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                  Connect
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedSkillsPanel;