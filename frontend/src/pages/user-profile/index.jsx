import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProfilePhotoSection from './components/ProfilePhotoSection';
import PersonalInfoForm from './components/PersonalInfoForm';
import SkillsSummaryCard from './components/SkillsSummaryCard';
import MeetingHistoryPanel from './components/MeetingHistoryPanel';
import VerificationStatusCard from './components/VarificationStatusCard';
import PrivacySettingsPanel from './components/PrivacySettingsPanel';

const UserProfile = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@stanford.edu",
    phone: "+1 (555) 123-4567",
    bio: `Computer Science student passionate about web development and machine learning. I enjoy teaching programming concepts and learning new technologies. Always excited to collaborate on innovative projects and share knowledge with fellow students.`,
    university: "Stanford University",
    graduationYear: "2025",
    major: "Computer Science",
    gpa: "3.8",
    linkedinUrl: "https://linkedin.com/in/alexjohnson",
    githubUrl: "https://github.com/alexjohnson",
    profilePhoto: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1"
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleProfileSave = (updatedData) => {
    setProfileData((prev) => ({ ...prev, ...updatedData }));
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePhotoUpdate = (newPhotoUrl) => {
    setProfileData((prev) => ({ ...prev, profilePhoto: newPhotoUrl }));
    setSuccessMessage('Profile photo updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePrivacySettingsSave = (settings) => {
    console.log('Privacy settings saved:', settings);
    setSuccessMessage('Privacy settings updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const tabs = [
  { id: 'profile', label: 'Profile Information', icon: 'User' },
  { id: 'skills', label: 'Skills & Meetings', icon: 'BookOpen' },
  { id: 'verification', label: 'Verification', icon: 'Shield' },
  { id: 'privacy', label: 'Privacy & Settings', icon: 'Settings' }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar} />

      <main className={`pt-16 transition-all duration-300 ${
      isSidebarCollapsed ? 'ml-16' : 'ml-64'}`
      }>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your personal information and account settings
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} />
                  Export Data
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Eye" size={16} />
                  Preview Profile
                </Button>
              </div>
            </div>

            {/* Success Message */}
            {successMessage &&
            <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                <span className="text-sm text-success font-medium">{successMessage}</span>
              </div>
            }
          </div>

          {/* Profile Summary Card */}
          <div className="mb-8 bg-card rounded-lg border border-border p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-muted border-4 border-border flex-shrink-0">
                {profileData?.profilePhoto ?
                <img
                  src={profileData?.profilePhoto}
                  alt="Profile photo showing user's professional headshot"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }} /> :


                <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Icon name="User" size={32} color="var(--color-muted-foreground)" />
                  </div>
                }
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">
                  {profileData?.firstName} {profileData?.lastName}
                </h2>
                <p className="text-muted-foreground">{profileData?.major} • {profileData?.university}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Class of {profileData?.graduationYear} • GPA: {profileData?.gpa}
                </p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">18</div>
                  <div>Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-success">34</div>
                  <div>Meetings</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-warning">4.7</div>
                  <div>Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                  activeTab === tab?.id ?
                  'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}`
                  }>

                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                )}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'profile' &&
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <PersonalInfoForm
                  initialData={profileData}
                  onSave={handleProfileSave} />

                </div>
                <div className="space-y-6">
                  <ProfilePhotoSection
                  currentPhoto={profileData?.profilePhoto}
                  onPhotoUpdate={handlePhotoUpdate} />

                </div>
              </div>
            }

            {activeTab === 'skills' &&
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SkillsSummaryCard
                skills={[]}
                totalSkills={18}
                recentlyAdded={3} />

                <MeetingHistoryPanel
                meetings={[]}
                stats={{
                  totalMeetings: 34,
                  completedMeetings: 28,
                  averageRating: 4.7,
                  totalHours: 52
                }} />

              </div>
            }

            {activeTab === 'verification' &&
            <div className="max-w-2xl">
                <VerificationStatusCard
                verificationStatus={{
                  emailVerified: true,
                  universityVerified: true,
                  phoneVerified: false,
                  profileComplete: 85
                }} />

              </div>
            }

            {activeTab === 'privacy' &&
            <div className="max-w-4xl">
                <PrivacySettingsPanel
                initialSettings={{
                  profileVisibility: 'university',
                  showEmail: false,
                  showPhone: false,
                  allowDirectMessages: true,
                  showSkillRatings: true,
                  showMeetingHistory: false,
                  allowSkillRecommendations: true,
                  dataSharing: false,
                  marketingEmails: false,
                  meetingNotifications: true,
                  skillMatchNotifications: true,
                  weeklyDigest: true
                }}
                onSave={handlePrivacySettingsSave} />

              </div>
            }
          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                <p>Profile last updated: October 25, 2025</p>
                <p>Account created: September 15, 2024</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  <Icon name="HelpCircle" size={16} />
                  Help & Support
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Trash2" size={16} />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default UserProfile;