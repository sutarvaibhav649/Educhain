import React from 'react';
import Button from '../../../components/ui/Button';
import DeleteConfirmModal from './DeleteConfirmModal';

const SkillTable = ({ skills = [], selectedIds = [], onEdit, onDelete, onSelectSkill }) => {
  // Filter out invalid skills
  const validSkills = skills.filter(skill => skill.title || skill.category);

  const toggleSelect = (id) => {
    if (!onSelectSkill) return;
    const isSelected = selectedIds.includes(id);
    onSelectSkill(id, !isSelected);
  };

  const toggleSelectAll = (checked) => {
    if (!onSelectSkill) return;
    const allIds = checked ? validSkills.map(s => s.id) : [];
    allIds.forEach(id => onSelectSkill(id, checked));
  };

  return (
    <>
      <table className="w-full text-left border-collapse border border-border">
        <thead>
          <tr className="bg-muted">
            <th className="p-2">
              <input
                type="checkbox"
                checked={validSkills.length > 0 && selectedIds.length === validSkills.length}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />
            </th>
            <th className="p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Proficiency</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {validSkills.length > 0 ? (
            validSkills.map(skill => (
              <tr key={skill.id} className="border-t border-border">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(skill.id)}
                    onChange={() => toggleSelect(skill.id)}
                  />
                </td>
                <td className="p-2">{skill.title || 'N/A'}</td>
                <td className="p-2">{skill.category || 'N/A'}</td>
                <td className="p-2">{skill.proficiency || 0}/5</td>
                <td className="p-2 flex gap-2">
                  <Button size="sm" onClick={() => onEdit(skill)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(skill)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center text-muted-foreground">
                No skills available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <DeleteConfirmModal
        isVisible={false} // keep controlled in parent
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    </>
  );
};

export default SkillTable;
