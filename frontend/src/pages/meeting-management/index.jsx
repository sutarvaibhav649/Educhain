import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MeetingCard from './components/MeetingCard';
import MeetingTable from './components/MeetingTable';
import MeetingFilters from './components/MeetingFilters';
import MeetingStats from './components/MeetingStats';
import MeetingModal from './components/MeetingModal';

const MeetingManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [viewMode, setViewMode] = useState('table');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: 'all',
    category: 'all',
    search: ''
  });

  // Mock meetings data
  const mockMeetings = [
    {
      id: 1,
      skillTopic: "React Hooks Deep Dive",
      category: "programming",
      dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)?.toISOString(),
      duration: 60,
      participants: ["Alex Johnson", "Sarah Chen"],
      status: "scheduled",
      location: "Online - Zoom",
      description: `Comprehensive session covering advanced React Hooks patterns including custom hooks, useCallback optimization, and performance considerations.\n\nWe'll explore real-world examples and best practices for building scalable React applications.`
    },
    {
      id: 2,
      skillTopic: "UI/UX Design Principles",
      category: "design",
      dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)?.toISOString(),
      duration: 90,
      participants: ["Maria Rodriguez", "David Kim"],
      status: "scheduled",
      location: "Library Room 204",
      description: "Interactive workshop on fundamental design principles, color theory, and user experience best practices."
    },
    {
      id: 3,
      skillTopic: "Spanish Conversation Practice",
      category: "languages",
      dateTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)?.toISOString(),
      duration: 45,
      participants: ["Carlos Mendez", "Emma Wilson"],
      status: "completed",
      location: "Online - Google Meet",
      description: "Conversational Spanish practice focusing on everyday situations and business terminology."
    },
    {
      id: 4,
      skillTopic: "Data Structures & Algorithms",
      category: "programming",
      dateTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)?.toISOString(),
      duration: 120,
      participants: ["Michael Brown", "Lisa Zhang"],
      status: "completed",
      location: "Computer Lab B",
      description: "Comprehensive review of fundamental data structures including arrays, linked lists, trees, and graphs with practical coding exercises."
    },
    {
      id: 5,
      skillTopic: "Photography Basics",
      category: "arts",
      dateTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)?.toISOString(),
      duration: 75,
      participants: ["Jennifer Lee", "Tom Anderson"],
      status: "canceled",
      location: "Campus Courtyard",
      description: "Introduction to photography fundamentals including composition, lighting, and camera settings."
    },
    {
      id: 6,
      skillTopic: "Business Plan Development",
      category: "business",
      dateTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)?.toISOString(),
      duration: 90,
      participants: ["Robert Taylor", "Amanda Davis"],
      status: "scheduled",
      location: "Business Building 301",
      description: "Step-by-step guide to creating comprehensive business plans including market analysis, financial projections, and pitch preparation."
    },
    {
      id: 7,
      skillTopic: "Calculus Problem Solving",
      category: "mathematics",
      dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)?.toISOString(),
      duration: 60,
      participants: ["Kevin Park", "Rachel Green"],
      status: "scheduled",
      location: "Math Tutoring Center",
      description: "Advanced calculus problem-solving techniques with focus on integration, differentiation, and real-world applications."
    },
    {
      id: 8,
      skillTopic: "Chemistry Lab Techniques",
      category: "science",
      dateTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)?.toISOString(),
      duration: 105,
      participants: ["Dr. Patricia White", "James Miller"],
      status: "completed",
      location: "Chemistry Lab 2A",
      description: "Hands-on laboratory techniques including titration, spectroscopy, and safety protocols for organic chemistry experiments."
    }
  ];

  const filteredMeetings = mockMeetings?.filter(meeting => {
    const meetingDate = new Date(meeting.dateTime);
    const now = new Date();
    
    // Tab filtering
    if (activeTab === 'upcoming') {
      if (meeting?.status !== 'scheduled' || meetingDate <= now) return false;
    } else if (activeTab === 'past') {
      if (meeting?.status === 'scheduled' && meetingDate > now) return false;
    }

    // Date range filtering
    if (filters?.startDate && meetingDate < new Date(filters.startDate)) return false;
    if (filters?.endDate && meetingDate > new Date(filters.endDate + 'T23:59:59')) return false;

    // Status filtering
    if (filters?.status !== 'all' && meeting?.status !== filters?.status) return false;

    // Category filtering
    if (filters?.category !== 'all' && meeting?.category !== filters?.category) return false;

    // Search filtering
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      const searchableText = `${meeting?.skillTopic} ${meeting?.participants?.join(' ')} ${meeting?.category}`?.toLowerCase();
      if (!searchableText?.includes(searchTerm)) return false;
    }

    return true;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      status: 'all',
      category: 'all',
      search: ''
    });
  };

  const handleExportCalendar = () => {
    // Mock export functionality
    const upcomingMeetings = mockMeetings?.filter(m => 
      m?.status === 'scheduled' && new Date(m.dateTime) > new Date()
    );
    
    console.log('Exporting calendar with', upcomingMeetings?.length, 'upcoming meetings');
    // In a real app, this would generate an .ics file or integrate with calendar APIs
  };

  const handleViewDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setModalType('details');
    setIsModalOpen(true);
  };

  const handleReschedule = (meeting) => {
    setSelectedMeeting(meeting);
    setModalType('reschedule');
    setIsModalOpen(true);
  };

  const handleCancel = (meeting) => {
    setSelectedMeeting(meeting);
    setModalType('cancel');
    setIsModalOpen(true);
  };

  const handleJoin = (meeting) => {
    console.log('Joining meeting:', meeting?.skillTopic);
    // In a real app, this would open the video call or redirect to meeting platform
  };

  const handleModalConfirm = (meeting) => {
    if (modalType === 'cancel') {
      console.log('Canceling meeting:', meeting?.id);
      // In a real app, this would make an API call to cancel the meeting
    } else if (modalType === 'reschedule') {
      navigate('/schedule-meeting', { state: { rescheduleMeeting: meeting } });
    }
    setIsModalOpen(false);
    setSelectedMeeting(null);
    setModalType(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeeting(null);
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Meeting Management</h1>
              <p className="text-muted-foreground mt-1">
                Track, schedule, and manage your learning sessions
              </p>
            </div>
            <Link to="/schedule-meeting">
              <Button variant="default">
                <Icon name="Plus" size={16} />
                <span className="ml-2">Schedule Meeting</span>
              </Button>
            </Link>
          </div>

          {/* Meeting Statistics */}
          <MeetingStats meetings={mockMeetings} />

          {/* Filters */}
          <MeetingFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onExportCalendar={handleExportCalendar}
          />

          {/* Tabs and View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  activeTab === 'upcoming' ?'bg-card text-foreground shadow-card' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Upcoming Meetings
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  activeTab === 'past' ?'bg-card text-foreground shadow-card' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Past Meetings
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {filteredMeetings?.length} meeting{filteredMeetings?.length !== 1 ? 's' : ''}
              </span>
              <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md transition-smooth ${
                    viewMode === 'table' ?'bg-card text-foreground shadow-card' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Table" size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-smooth ${
                    viewMode === 'grid' ?'bg-card text-foreground shadow-card' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Grid3X3" size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Meetings Content */}
          {filteredMeetings?.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No meetings found</h3>
              <p className="text-muted-foreground mb-6">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming meetings scheduled." :"No past meetings match your current filters."
                }
              </p>
              {activeTab === 'upcoming' && (
                <Link to="/schedule-meeting">
                  <Button variant="default">
                    <Icon name="Plus" size={16} />
                    <span className="ml-2">Schedule Your First Meeting</span>
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {viewMode === 'table' ? (
                <MeetingTable
                  meetings={filteredMeetings}
                  onReschedule={handleReschedule}
                  onCancel={handleCancel}
                  onJoin={handleJoin}
                  onViewDetails={handleViewDetails}
                />
              ) : (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMeetings?.map((meeting) => (
                      <MeetingCard
                        key={meeting?.id}
                        meeting={meeting}
                        onReschedule={handleReschedule}
                        onCancel={handleCancel}
                        onJoin={handleJoin}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      {/* Meeting Modal */}
      <MeetingModal
        meeting={selectedMeeting}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        type={modalType}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default MeetingManagement;