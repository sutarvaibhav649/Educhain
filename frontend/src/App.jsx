import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SkillsPage from "./pages/SkillPage";
import MeetingsPage from "./pages/MeetingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/meetings" element={<MeetingsPage />} />
      <Route path="*" element={<h2 className="p-4">404 - Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
