import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SkillForm from './components/SkillForm';
import SkillCard from './components/SkillCard';
import SkillTable from './components/SkillTable';
import SkillFilters from './components/SkillFilters';
import SkillStats from './components/SkillStats';
import BulkActions from './components/BulkActions';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import axios from 'axios';

const SkillManagement = () => {
  const [skills, setSkills] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [deletingSkill, setDeletingSkill] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filters, setFilters] = useState({ search: '', category: '' });

  // Fetch skills from backend
  const fetchSkills = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/skills');
      // Filter out skills with missing essential fields
      const validSkills = res.data.filter(skill => skill.title && skill.category);
      setSkills(validSkills);
    } catch (err) {
      console.error('Error fetching skills:', err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Filtered skills based on search and category
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category ? skill.category === filters.category : true;
      return matchesSearch && matchesCategory;
    });
  }, [skills, filters]);

  const handleAddSkill = () => {
    setEditingSkill(null);
    setIsFormVisible(true);
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setIsFormVisible(true);
  };

  const handleDeleteSkill = (skill) => {
    setDeletingSkill(skill);
  };

  const handleFormSuccess = async () => {
    await fetchSkills();
    setIsFormVisible(false);
    setEditingSkill(null);
  };

  const confirmDelete = async () => {
    if (!deletingSkill) return;
    try {
      await axios.delete(`http://localhost:8080/api/skills/${deletingSkill.id}`);
      setSkills(prev => prev.filter(s => s.id !== deletingSkill.id));
      setSelectedSkills(prev => prev.filter(id => id !== deletingSkill.id));
      setDeletingSkill(null);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete skill.');
    }
  };

  const handleSelectionChange = (selectedIds) => {
    setSelectedSkills(selectedIds);
  };

  const handleBulkSuccess = async () => {
    await fetchSkills();
    setSelectedSkills([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="pt-16 lg:ml-64 p-6 transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Skill Management</h1>
            <p className="text-muted-foreground">Manage your skills and expertise to help other students learn</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button variant={viewMode === 'table' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('table')}>
                <Icon name="Table" size={16} />
              </Button>
              <Button variant={viewMode === 'cards' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('cards')}>
                <Icon name="Grid3X3" size={16} />
              </Button>
            </div>
            <Button onClick={handleAddSkill} iconName="Plus" iconPosition="left">
              Add New Skill
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6">
            <SkillFilters filters={filters} setFilters={setFilters} />
            <BulkActions selectedIds={selectedSkills} onSuccess={handleBulkSuccess} />

            {viewMode === 'table' ? (
              <SkillTable
                skills={filteredSkills}
                selectedIds={selectedSkills}
                onEdit={handleEditSkill}
                onDelete={handleDeleteSkill}
                onSelectSkill={(id, selected) => {
                  setSelectedSkills(prev => {
                    if (selected) return [...prev, id];
                    return prev.filter(sid => sid !== id);
                  });
                }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSkills.length > 0 ? filteredSkills.map(skill => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onEdit={handleEditSkill}
                    onDelete={handleDeleteSkill}
                  />
                )) : (
                  <div className="col-span-full text-center py-12">
                    <Icon name="BookOpen" size={48} className="mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No skills found</h3>
                    <Button onClick={handleAddSkill} iconName="Plus" iconPosition="left">
                      Add Your First Skill
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stats Sidebar */}
          <div className="xl:col-span-1">
            <SkillStats skills={filteredSkills} />
          </div>
        </div>
      </main>

      {/* Modals */}
      <SkillForm
        skill={editingSkill}
        isVisible={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        onSuccess={handleFormSuccess}
      />

      <DeleteConfirmModal
        isVisible={!!deletingSkill}
        onCancel={() => setDeletingSkill(null)}
        onConfirm={confirmDelete}
        itemName="Skill"
      />
    </div>
  );
};

export default SkillManagement;
