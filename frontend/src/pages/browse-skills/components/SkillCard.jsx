import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillCard = ({ skill }) => {
  const navigate = useNavigate();

  return (
    <div className="border border-border rounded-lg p-4 flex flex-col hover:shadow-lg transition">
      <h4 className="text-lg font-semibold text-foreground">{skill.title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
      <div className="flex items-center mt-2 space-x-2 text-sm text-muted-foreground">
        <span>{skill.category}</span>
        <span>•</span>
        <span>{skill.proficiencyLevel}</span>
        <span>•</span>
        <span>{skill.university}</span>
      </div>
      <div className="flex items-center mt-2 space-x-2">
        {Array.from({ length: 5 }, (_, i) => (
          <Icon
            key={i}
            name="Star"
            size={14}
            className={i < Math.round(skill.rating) ? 'text-warning fill-current' : 'text-muted'}
          />
        ))}
        <span className="text-sm text-muted-foreground">({skill.rating})</span>
      </div>
      <div className="mt-4 flex space-x-2">
        <Button
          size="sm"
          onClick={() => navigate(`/schedule-meeting/${skill.id}`)}
        >
          Schedule Meeting
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/user-profile/${skill.instructorId}`)}
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default SkillCard;
