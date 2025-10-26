import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import SkillManagement from './pages/skill-management';
import UserDashboard from './pages/user-dashboard';
import ScheduleMeeting from './pages/schedule-meeting';
import MeetingManagement from './pages/meeting-management';
import UserProfile from './pages/user-profile';
import BrowseSkills from './pages/browse-skills';
import Signup from "components/Signup";
import Signin from "components/Signin";
import Home from "components/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<BrowseSkills />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/skill-management" element={<SkillManagement />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
        <Route path="/meeting-management" element={<MeetingManagement />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/browse-skills" element={<BrowseSkills />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
