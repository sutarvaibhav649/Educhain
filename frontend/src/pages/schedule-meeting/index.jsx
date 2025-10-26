import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CalendarWidget from './components/CalenderWidget';
import TimeSlotPicker from './components/TimeSlotPicker';
import MeetingDetailsForm from './components/MeetingDetailsForm';
import ParticipantInfo from './components/ParticipantInfo';
import ConfirmationSummary from './components/ConfirmationSummary';

const ScheduleMeeting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    skillId: '',
    duration: '60',
    format: 'virtual',
    platform: 'zoom',
    location: '',
    title: '',
    agenda: '',
    preparation: '',
    allowRecording: false,
    needsScreenShare: false,
    beginnerFriendly: true
  });
  const [errors, setErrors] = useState({});

  // Mock data
  const availableSlots = [
  {
    date: '2025-10-26',
    times: ['09:00', '10:30', '14:00', '15:30', '16:00']
  },
  {
    date: '2025-10-27',
    times: ['10:00', '11:30', '13:00', '14:30', '16:30']
  },
  {
    date: '2025-10-28',
    times: ['09:30', '11:00', '13:30', '15:00', '17:00']
  },
  {
    date: '2025-10-29',
    times: ['08:30', '10:00', '14:00', '15:30', '16:30']
  },
  {
    date: '2025-10-30',
    times: ['09:00', '10:30', '12:00', '14:30', '16:00']
  }];


  const availableSkills = [
  { value: 'react-basics', label: 'React Basics', description: 'Components, JSX, Props' },
  { value: 'react-hooks', label: 'React Hooks', description: 'useState, useEffect, Custom Hooks' },
  { value: 'javascript-es6', label: 'JavaScript ES6+', description: 'Modern JavaScript Features' },
  { value: 'node-express', label: 'Node.js & Express', description: 'Backend Development' },
  { value: 'python-basics', label: 'Python Programming', description: 'Fundamentals and Syntax' },
  { value: 'data-structures', label: 'Data Structures', description: 'Arrays, Objects, Algorithms' },
  { value: 'git-github', label: 'Git & GitHub', description: 'Version Control Basics' },
  { value: 'css-flexbox', label: 'CSS Flexbox & Grid', description: 'Modern CSS Layouts' }];


  const instructor = {
    id: 'inst-001',
    name: 'Sarah Chen',
    avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
    avatarAlt: 'Professional headshot of Asian woman with shoulder-length black hair in white blazer',
    major: 'Computer Science, Senior',
    rating: 4.9,
    reviewCount: 47,
    sessionsCompleted: 89,
    bio: 'Passionate about web development with 3+ years of React experience. I love helping fellow students master modern JavaScript frameworks through hands-on practice and real-world projects.',
    availability: 'Weekdays 9 AM - 6 PM',
    skills: [
    { id: 1, name: 'React', proficiency: 'Expert' },
    { id: 2, name: 'JavaScript', proficiency: 'Expert' },
    { id: 3, name: 'Node.js', proficiency: 'Intermediate' },
    { id: 4, name: 'TypeScript', proficiency: 'Intermediate' }]

  };

  const student = {
    id: 'student-001',
    name: 'Alex Johnson',
    avatar: "https://images.unsplash.com/photo-1611695434398-4f4b330623e6",
    avatarAlt: 'Professional headshot of young man with brown hair in navy blue shirt',
    major: 'Information Systems, Junior',
    joinDate: 'Sep 2024',
    skillsLearned: 12,
    learningGoals: 'Looking to build modern web applications and improve my frontend development skills for upcoming internship applications.'
  };

  // Get instructor from URL params if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const instructorId = params?.get('instructor');
    const skillId = params?.get('skill');

    if (skillId) {
      setFormData((prev) => ({ ...prev, skillId }));
    }
  }, [location]);

  const steps = [
  { id: 1, title: 'Select Date', icon: 'Calendar' },
  { id: 2, title: 'Choose Time', icon: 'Clock' },
  { id: 3, title: 'Meeting Details', icon: 'FileText' },
  { id: 4, title: 'Confirm', icon: 'CheckCircle' }];


  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!selectedDate) newErrors.date = 'Please select a date';
        break;
      case 2:
        if (!selectedTime) newErrors.time = 'Please select a time';
        break;
      case 3:
        if (!formData?.skillId) newErrors.skillId = 'Please select a skill';
        if (!formData?.duration) newErrors.duration = 'Please select duration';
        if (!formData?.format) newErrors.format = 'Please select meeting format';
        if (formData?.format === 'virtual' && !formData?.platform) {
          newErrors.platform = 'Please select a platform';
        }
        if (formData?.format === 'in-person' && !formData?.location) {
          newErrors.location = 'Please select a location';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmMeeting = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to meeting management with success message
      navigate('/meeting-management', {
        state: {
          message: 'Meeting scheduled successfully!',
          meetingData: {
            date: selectedDate,
            time: selectedTime,
            instructor: instructor?.name,
            skill: availableSkills?.find((s) => s?.value === formData?.skillId)?.label
          }
        }
      });
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditDetails = () => {
    setCurrentStep(3);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:return selectedDate !== null;
      case 2:return selectedTime !== '';
      case 3:return formData?.skillId && formData?.duration && formData?.format;
      case 4:return true;
      default:return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}>

                <Icon name="ArrowLeft" size={16} />
                <span className="ml-1">Back</span>
              </Button>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">Schedule a Learning Session</h1>
            <p className="text-muted-foreground">
              Book a one-on-one session with {instructor?.name} to learn new skills
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl">
              {steps?.map((step, index) =>
              <React.Fragment key={step?.id}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-smooth ${
                  currentStep >= step?.id ?
                  'bg-primary border-primary text-primary-foreground' :
                  'border-border text-muted-foreground'}`
                  }>
                      <Icon name={step?.icon} size={16} />
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                  currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'}`
                  }>
                      {step?.title}
                    </span>
                  </div>
                  {index < steps?.length - 1 &&
                <div className={`flex-1 h-0.5 mx-4 ${
                currentStep > step?.id ? 'bg-primary' : 'bg-border'}`
                } />
                }
                </React.Fragment>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {currentStep === 1 &&
              <CalendarWidget
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                availableSlots={availableSlots} />

              }

              {currentStep === 2 &&
              <TimeSlotPicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
                availableSlots={availableSlots} />

              }

              {currentStep === 3 &&
              <MeetingDetailsForm
                formData={formData}
                onFormChange={setFormData}
                availableSkills={availableSkills}
                errors={errors} />

              }

              {currentStep === 4 &&
              <ConfirmationSummary
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                formData={formData}
                instructor={instructor}
                onConfirm={handleConfirmMeeting}
                onEdit={handleEditDetails}
                isLoading={isLoading} />

              }

              {/* Navigation Buttons */}
              {currentStep < 4 &&
              <div className="flex justify-between pt-6">
                  <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}>

                    <Icon name="ChevronLeft" size={16} />
                    <span className="ml-1">Previous</span>
                  </Button>
                  
                  <Button
                  variant="default"
                  onClick={handleNextStep}
                  disabled={!canProceed()}>

                    <span className="mr-1">Next</span>
                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </div>
              }
            </div>

            {/* Right Column - Participant Info */}
            <div className="lg:col-span-1">
              <ParticipantInfo
                instructor={instructor}
                student={student} />

            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default ScheduleMeeting;