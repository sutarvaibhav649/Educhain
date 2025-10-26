import React from 'react';

const SkillCardSkeleton = () => {
  return (
    <div className="border border-border rounded-lg p-4 flex flex-col animate-pulse">
      {/* Title */}
      <div className="h-5 w-3/4 bg-muted rounded mb-2"></div>

      {/* Description */}
      <div className="h-4 w-full bg-muted rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-muted rounded mb-4"></div>

      {/* Details */}
      <div className="flex items-center space-x-2 mb-2">
        <div className="h-3 w-1/4 bg-muted rounded"></div>
        <div className="h-3 w-1/6 bg-muted rounded"></div>
        <div className="h-3 w-1/5 bg-muted rounded"></div>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-3 w-3 bg-muted rounded-full"></div>
        ))}
        <div className="h-3 w-6 bg-muted rounded ml-2"></div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-2 mt-auto">
        <div className="h-8 flex-1 bg-muted rounded"></div>
        <div className="h-8 flex-1 bg-muted rounded"></div>
      </div>
    </div>
  );
};

export default SkillCardSkeleton;
