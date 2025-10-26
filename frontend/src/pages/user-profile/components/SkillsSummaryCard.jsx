import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsSummaryCard = ({ skills, totalSkills, recentlyAdded }) => {
  const skillCategories = [
    {
      name: "Programming",
      count: 8,
      color: "bg-blue-100 text-blue-800",
      icon: "Code"
    },
    {
      name: "Design",
      count: 3,
      color: "bg-purple-100 text-purple-800",
      icon: "Palette"
    },
    {
      name: "Data Science",
      count: 5,
      color: "bg-green-100 text-green-800",
      icon: "BarChart3"
    },
    {
      name: "Business",
      count: 2,
      color: "bg-orange-100 text-orange-800",
      icon: "Briefcase"
    }
  ];

  const topSkills = [
    {
      id: 1,
      name: "React Development",
      level: "Advanced",
      levelColor: "text-green-600",
      studentsHelped: 15,
      rating: 4.8
    },
    {
      id: 2,
      name: "Python Programming",
      level: "Expert",
      levelColor: "text-blue-600",
      studentsHelped: 23,
      rating: 4.9
    },
    {
      id: 3,
      name: "UI/UX Design",
      level: "Intermediate",
      levelColor: "text-yellow-600",
      studentsHelped: 8,
      rating: 4.6
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Skills Overview</h3>
        <Link to="/skill-management">
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={16} />
            Manage Skills
          </Button>
        </Link>
      </div>
      {/* Skills Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{totalSkills || 18}</div>
          <div className="text-sm text-muted-foreground">Total Skills</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-success">{recentlyAdded || 3}</div>
          <div className="text-sm text-muted-foreground">This Month</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-accent">46</div>
          <div className="text-sm text-muted-foreground">Students Helped</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-warning">4.7</div>
          <div className="text-sm text-muted-foreground">Avg Rating</div>
        </div>
      </div>
      {/* Skill Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3">Categories</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {skillCategories?.map((category, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
              <div className={`p-2 rounded-lg ${category?.color}`}>
                <Icon name={category?.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{category?.name}</div>
                <div className="text-xs text-muted-foreground">{category?.count} skills</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Top Skills */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-foreground">Top Performing Skills</h4>
          <Link to="/skill-management" className="text-xs text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {topSkills?.map((skill) => (
            <div key={skill?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{skill?.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full bg-muted ${skill?.levelColor}`}>
                    {skill?.level}
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {skill?.studentsHelped} students helped
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} color="var(--color-warning)" />
                    <span className="text-xs text-muted-foreground">{skill?.rating}</span>
                  </div>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Link to="/skill-management" className="flex-1">
            <Button variant="outline" fullWidth>
              <Icon name="Plus" size={16} />
              Add New Skill
            </Button>
          </Link>
          <Link to="/browse-skills" className="flex-1">
            <Button variant="ghost" fullWidth>
              <Icon name="Search" size={16} />
              Browse Skills
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillsSummaryCard;