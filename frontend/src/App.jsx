import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SkillsPage from "./pages/SkillPage";
import MeetingsPage from "./pages/MeetingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/meetings" element={<MeetingsPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<h2 className="p-4">404 - Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
