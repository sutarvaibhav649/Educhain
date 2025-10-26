import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import WelcomeSection from './components/WelcomeSection';
import QuickActions from './components/QuickActions';
import MySkillsPanel from './components/MySkillsPanel';
import UpcomingMeetingsPanel from './components/UpcomingMeetingsPanel';
import RecentActivityPanel from './components/RecentActivityPanel';
import RecommendedSkillsPanel from './components/RecommendedSkillsPanel';
import NotificationIndicator from './components/NotificationIndicator';

const UserDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Mock user data
  const userData = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    university: "Stanford University",
    program: "Computer Science • Junior",
    avatar: "https://images.unsplash.com/photo-1630473147136-fedd85b45f25",
    avatarAlt: "Professional headshot of young woman with brown hair and friendly smile"
  };

  // Mock statistics
  const userStats = {
    skillsShared: 8,
    meetingsScheduled: 12,
    learningHours: 45
  };

  // Mock user skills
  const userSkills = [
  {
    id: 1,
    title: "React Development",
    category: "Programming",
    proficiency: "Advanced",
    interestedCount: 15,
    meetingsCount: 8,
    description: "Building modern web applications with React, hooks, and state management"
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    category: "Computer Science",
    proficiency: "Expert",
    interestedCount: 23,
    meetingsCount: 12,
    description: "Comprehensive understanding of algorithms, complexity analysis, and optimization"
  },
  {
    id: 3,
    title: "UI/UX Design",
    category: "Design",
    proficiency: "Intermediate",
    interestedCount: 9,
    meetingsCount: 5,
    description: "User interface design principles, prototyping, and user experience research"
  },
  {
    id: 4,
    title: "Machine Learning Basics",
    category: "AI/ML",
    proficiency: "Beginner",
    interestedCount: 18,
    meetingsCount: 3,
    description: "Introduction to ML concepts, supervised learning, and Python libraries"
  },
  {
    id: 5,
    title: "Spanish Conversation",
    category: "Language",
    proficiency: "Intermediate",
    interestedCount: 7,
    meetingsCount: 6,
    description: "Conversational Spanish practice for intermediate learners"
  }];


  // Mock upcoming meetings
  const upcomingMeetings = [
  {
    id: 1,
    partnerName: "Alex Chen",
    partnerAvatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    partnerAvatarAlt: "Professional headshot of Asian man with glasses and dark hair in business attire",
    skillTopic: "Python for Data Science",
    dateTime: "2025-10-25T14:30:00",
    duration: "1 hour",
    status: "confirmed",
    type: "learning"
  },
  {
    id: 2,
    partnerName: "Maria Rodriguez",
    partnerAvatar: "https://images.unsplash.com/photo-1507532459814-b32f63cf4497",
    partnerAvatarAlt: "Professional headshot of Hispanic woman with long dark hair and warm smile",
    skillTopic: "React Hooks Deep Dive",
    dateTime: "2025-10-26T10:00:00",
    duration: "45 minutes",
    status: "confirmed",
    type: "teaching"
  },
  {
    id: 3,
    partnerName: "David Kim",
    partnerAvatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
    partnerAvatarAlt: "Professional headshot of Korean man with short black hair in navy suit",
    skillTopic: "Database Design Principles",
    dateTime: "2025-10-27T16:15:00",
    duration: "1.5 hours",
    status: "pending",
    type: "learning"
  }];


  // Mock recent activities
  const recentActivities = [
  {
    id: 1,
    type: "meeting_completed",
    title: "Meeting Completed",
    description: "Finished React Fundamentals session with Emma Wilson",
    timestamp: "2025-10-25T11:30:00",
    relatedUser: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1589913213091-22a5c6db840a",
      avatarAlt: "Professional headshot of blonde woman with blue eyes and professional attire"
    }
  },
  {
    id: 2,
    type: "skill_added",
    title: "New Skill Added",
    description: "Added \'Machine Learning Basics\' to your skill portfolio",
    timestamp: "2025-10-25T09:15:00"
  },
  {
    id: 3,
    type: "meeting_scheduled",
    title: "Meeting Scheduled",
    description: "Python for Data Science session with Alex Chen",
    timestamp: "2025-10-24T16:45:00",
    relatedUser: {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
      avatarAlt: "Professional headshot of Asian man with glasses and dark hair in business attire"
    }
  },
  {
    id: 4,
    type: "skill_request",
    title: "Skill Request",
    description: "John Doe requested to learn React Development from you",
    timestamp: "2025-10-24T14:20:00",
    relatedUser: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1688247428578-3a2946ff9fdf",
      avatarAlt: "Professional headshot of man with brown hair and beard in casual shirt"
    }
  },
  {
    id: 5,
    type: "achievement",
    title: "Achievement Unlocked",
    description: "Completed 10 successful teaching sessions - Knowledge Sharer badge earned!",
    timestamp: "2025-10-24T12:00:00"
  }];


  // Mock recommended skills
  const recommendedSkills = [
  {
    id: 1,
    title: "Advanced JavaScript",
    category: "Programming",
    proficiency: "Advanced",
    teacherName: "Michael Brown",
    teacherAvatar: "https://images.unsplash.com/photo-1734434570358-21badf4ba1c6",
    teacherAvatarAlt: "Professional headshot of man with short brown hair and friendly expression",
    rating: 4.9,
    studentsCount: 24,
    description: "Master advanced JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features for professional development.",
    tags: ["ES6+", "Async/Await", "Closures", "Prototypes"]
  },
  {
    id: 2,
    title: "Digital Marketing Strategy",
    category: "Business",
    proficiency: "Intermediate",
    teacherName: "Lisa Zhang",
    teacherAvatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
    teacherAvatarAlt: "Professional headshot of Asian woman with long black hair in business attire",
    rating: 4.7,
    studentsCount: 18,
    description: "Learn comprehensive digital marketing strategies including SEO, social media marketing, content creation, and analytics.",
    tags: ["SEO", "Social Media", "Analytics", "Content"]
  },
  {
    id: 3,
    title: "Calculus II",
    category: "Mathematics",
    proficiency: "Expert",
    teacherName: "Dr. Robert Taylor",
    teacherAvatar: "https://images.unsplash.com/photo-1729162128021-f37dca3ff30d",
    teacherAvatarAlt: "Professional headshot of middle-aged man with gray hair and glasses in academic setting",
    rating: 4.8,
    studentsCount: 31,
    description: "Advanced calculus concepts including integration techniques, series, and multivariable calculus applications.",
    tags: ["Integration", "Series", "Multivariable", "Applications"]
  },
  {
    id: 4,
    title: "Photography Basics",
    category: "Creative Arts",
    proficiency: "Beginner",
    teacherName: "Sophie Martinez",
    teacherAvatar: "https://images.unsplash.com/photo-1715133277743-26ce90999f83",
    teacherAvatarAlt: "Professional headshot of young woman with curly hair holding camera in natural lighting",
    rating: 4.6,
    studentsCount: 12,
    description: "Learn fundamental photography skills including composition, lighting, camera settings, and basic post-processing techniques.",
    tags: ["Composition", "Lighting", "Camera Settings", "Editing"]
  }];


  // Mock notifications
  const notifications = [
  {
    id: 1,
    type: "meeting_request",
    title: "New Meeting Request",
    message: "Alex Chen wants to schedule a Python session",
    timestamp: "2025-10-25T12:30:00",
    read: false
  },
  {
    id: 2,
    type: "skill_match",
    title: "Skill Match Found",
    message: "3 students are interested in your React skills",
    timestamp: "2025-10-25T10:15:00",
    read: false
  },
  {
    id: 3,
    type: "system_update",
    title: "Platform Update",
    message: "New video calling features are now available",
    timestamp: "2025-10-24T18:00:00",
    read: true
  }];


  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} />
      
      <main className={`pt-16 transition-all duration-300 ${
      isSidebarCollapsed ? 'ml-16' : 'ml-64'}`
      }>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <WelcomeSection user={userData} stats={userStats} />

          {/* Quick Actions */}
          <QuickActions />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {/* My Skills Panel */}
            <div className="xl:col-span-1">
              <MySkillsPanel skills={userSkills} />
            </div>

            {/* Upcoming Meetings Panel */}
            <div className="xl:col-span-1">
              <UpcomingMeetingsPanel meetings={upcomingMeetings} />
            </div>

            {/* Recent Activity Panel */}
            <div className="xl:col-span-1">
              <RecentActivityPanel activities={recentActivities} />
            </div>
          </div>

          {/* Recommended Skills Panel */}
          <div className="mb-6">
            <RecommendedSkillsPanel recommendedSkills={recommendedSkills} />
          </div>
        </div>
      </main>

      {/* Floating Notification Indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        <NotificationIndicator notifications={notifications} />
      </div>
    </div>);

};

export default UserDashboard;