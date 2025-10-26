import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ParticipantInfo = ({ instructor, student }) => {
  const renderSkillBadges = (skills) => {
    return skills?.slice(0, 3)?.map(skill => (
      <span
        key={skill?.id}
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          skill?.proficiency === 'Expert' ?'bg-success/10 text-success border border-success/20'
            : skill?.proficiency === 'Intermediate' ?'bg-warning/10 text-warning border border-warning/20' :'bg-muted text-muted-foreground border border-border'
        }`}
      >
        {skill?.name}
      </span>
    ));
  };

  const getProficiencyColor = (level) => {
    switch (level) {
      case 'Expert': return 'text-success';
      case 'Intermediate': return 'text-warning';
      case 'Beginner': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Users" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Session Participants</h3>
      </div>
      <div className="space-y-6">
        {/* Instructor Information */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Image
                src={instructor?.avatar}
                alt={instructor?.avatarAlt}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="GraduationCap" size={12} color="white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-base font-semibold text-foreground">{instructor?.name}</h4>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                  Instructor
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{instructor?.major}</p>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} />
                  <span>{instructor?.rating} ({instructor?.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{instructor?.sessionsCompleted} sessions</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {renderSkillBadges(instructor?.skills)}
                {instructor?.skills?.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{instructor?.skills?.length - 3} more
                  </span>
                )}
              </div>
              
              <p className="text-sm text-foreground line-clamp-2">{instructor?.bio}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Available: </span>
                <span className="text-foreground font-medium">{instructor?.availability}</span>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="MessageCircle" size={14} />
                <span className="ml-1">Message</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-accent/5 rounded-lg p-4">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Image
                src={student?.avatar}
                alt={student?.avatarAlt}
                className="w-16 h-16 rounded-full object-cover border-2 border-accent"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={12} color="white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-base font-semibold text-foreground">{student?.name}</h4>
                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium">
                  Student
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{student?.major}</p>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>Joined {student?.joinDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="BookOpen" size={12} />
                  <span>{student?.skillsLearned} skills learned</span>
                </div>
              </div>
              
              {student?.learningGoals && (
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Learning Goals:</p>
                  <p className="text-sm text-foreground">{student?.learningGoals}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Session Context */}
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Target" size={16} className="text-primary" />
            <h5 className="text-sm font-semibold text-foreground">Session Context</h5>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Skill Level Match:</span>
              <span className="text-foreground font-medium">Excellent</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Learning Style:</span>
              <span className="text-foreground font-medium">Hands-on Practice</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Session Type:</span>
              <span className="text-foreground font-medium">One-on-One Tutorial</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-primary/20">
            <p className="text-xs text-muted-foreground">
              <Icon name="Lightbulb" size={12} className="inline mr-1" />
              This instructor has successfully taught this skill to 15+ students with similar backgrounds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantInfo;