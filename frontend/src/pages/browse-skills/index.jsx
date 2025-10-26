import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';

import FilterPanel from './components/FilterPanel';
import SkillGrid from './components/SkillGrid';
import CategoryChips from './components/CategoryChips';

const BrowseSkills = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [page, setPage] = useState(1); // for pagination

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    proficiencyLevel: 'all',
    university: 'all',
    sortBy: 'relevance',
    availableToday: false,
    availableThisWeek: false,
    onlineOnly: false,
    minRating: 0
  });

  // Fetch skills from backend
  const fetchSkills = async (page = 1) => {
    try {
      setLoading(true);

      // Build query parameters from filters
      const params = {
        page,
        search: filters.search,
        category: filters.category !== 'all' ? filters.category : undefined,
        proficiencyLevel: filters.proficiencyLevel !== 'all' ? filters.proficiencyLevel : undefined,
        university: filters.university !== 'all' ? filters.university : undefined,
        minRating: filters.minRating > 0 ? filters.minRating : undefined,
        availableToday: filters.availableToday || undefined,
        availableThisWeek: filters.availableThisWeek || undefined,
        onlineOnly: filters.onlineOnly || undefined,
        sortBy: filters.sortBy
      };

      const response = await axios.get('http://localhost:5000/api/skills', { params });

      // Append new skills for pagination or reset if page=1
      const newSkills = page === 1 ? response.data.skills : [...skills, ...response.data.skills];

      setSkills(newSkills);
      setFilteredSkills(newSkills);
      setHasMore(response.data.hasMore); // backend should return this
      setLoading(false);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setLoading(false);
    }
  };

  // Fetch skills on mount or when filters change
  useEffect(() => {
    fetchSkills(1);
    setPage(1);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      proficiencyLevel: 'all',
      university: 'all',
      sortBy: 'relevance',
      availableToday: false,
      availableThisWeek: false,
      onlineOnly: false,
      minRating: 0
    });
  };

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category });
  };

  const handleLoadMore = () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    fetchSkills(nextPage);
    setPage(nextPage);
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const toggleFilterPanel = () => setFilterPanelOpen(!filterPanelOpen);

  // Skill counts can optionally come from backend as a separate API
  const skillCounts = {}; // You can implement an endpoint /api/skills/counts

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />

      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="flex">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isOpen={filterPanelOpen}
            onClose={toggleFilterPanel}
            resultCount={filteredSkills?.length} 
          />

          <div className="flex-1 p-6 lg:pl-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Browse Skills</h1>
                  <p className="text-muted-foreground">
                    Discover learning opportunities from talented students across universities
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={toggleFilterPanel}
                  className="lg:hidden"
                  iconName="Filter"
                  iconPosition="left"
                >
                  Filters
                </Button>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                <span>
                  Showing {filteredSkills?.length} skills
                </span>
                <div className="hidden sm:flex items-center space-x-4">
                  <span>Sort by: {filters?.sortBy}</span>
                  {Object.values(filters).some((value) => value !== 'all' && value !== 'relevance' && value !== '' && value !== false && value !== 0) &&
                    <button
                      onClick={handleClearFilters}
                      className="text-primary hover:text-primary/80 transition-smooth"
                    >
                      Clear filters
                    </button>
                  }
                </div>
              </div>

              <CategoryChips
                selectedCategory={filters?.category}
                onCategoryChange={handleCategoryChange}
                skillCounts={skillCounts} 
              />
            </div>

            <SkillGrid
              skills={filteredSkills}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowseSkills;
