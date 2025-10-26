import SkillCard from './SkillCard';
import SkillCardSkeleton from './SkillCardSkeleton';

// SkillGrid.jsx
const SkillGrid = ({ skills = [], loading, hasMore, onLoadMore }) => {
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && skills.length === 0 && <p>No skills found</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      {hasMore && !loading && (
        <button onClick={onLoadMore} className="mt-4 btn">
          Load More
        </button>
      )}
    </div>
  );
};


export default SkillGrid;
