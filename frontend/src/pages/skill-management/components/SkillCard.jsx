import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillCard = ({ skill, onEdit, onDelete }) => {
  const getProficiencyColor = (level) => {
    const colors = {
      1: 'bg-red-100 text-red-800',
      2: 'bg-orange-100 text-orange-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-blue-100 text-blue-800',
      5: 'bg-green-100 text-green-800'
    };
    return colors?.[level] || colors?.[3];
  };

  const getProficiencyLabel = (level) => {
    const labels = {
      1: 'Beginner',
      2: 'Basic',
      3: 'Intermediate',
      4: 'Advanced',
      5: 'Expert'
    };
    return labels?.[level] || 'Intermediate';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'programming': 'Code',
      'design': 'Palette',
      'business': 'Briefcase',
      'languages': 'Globe',
      'mathematics': 'Calculator',
      'music': 'Music',
      'sports': 'Trophy',
      'other': 'Star'
    };
    return icons?.[category] || 'Star';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover-lift transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getCategoryIcon(skill?.category)} size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{skill?.title}</h3>
            <p className="text-sm text-muted-foreground capitalize">{skill?.category?.replace('-', ' ')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(skill)}>
            <Icon name="Edit" size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(skill)}>
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {skill?.description}
      </p>
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProficiencyColor(skill?.proficiency)}`}>
          {getProficiencyLabel(skill?.proficiency)}
        </span>
        <span className="text-xs text-muted-foreground">
          Created {formatDate(skill?.createdAt)}
        </span>
      </div>
      {skill?.tags && skill?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skill?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {skill?.tags?.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
              +{skill?.tags?.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillCard;