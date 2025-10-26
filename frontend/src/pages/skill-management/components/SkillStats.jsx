import React from 'react';

const SkillStats = ({ skills }) => {
  // Ensure skills is always an array
  const skillArray = Array.isArray(skills) ? skills : [];

  const total = skillArray.length;

  const byCategory = skillArray.reduce((acc, skill) => {
    if (skill?.category) {
      acc[skill.category] = (acc[skill.category] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="flex gap-6 mb-4 flex-wrap">
      <div>Total Skills: {total}</div>
      {Object.entries(byCategory).map(([category, count]) => (
        <div key={category}>{category}: {count}</div>
      ))}
    </div>
  );
};

export default SkillStats;
